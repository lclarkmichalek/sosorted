#!/bin/bash
set -euo pipefail

# Log all output
exec > >(tee -a /var/log/runner-startup.log) 2>&1
echo "=== Runner startup script started at $(date) ==="

# Install dependencies
echo "Installing dependencies..."
export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y curl jq git build-essential

# Create runner user with passwordless sudo
echo "Creating runner user..."
useradd -m -s /bin/bash runner || true
echo "runner ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/runner
chmod 440 /etc/sudoers.d/runner

# Mount the persistent cache disk if attached. First boot formats ext4;
# subsequent boots just mount the existing filesystem.
#
# The GCE block device path /dev/disk/by-id/google-<device_name> is stable
# and matches the `device_name` on the attached_disk in instance-template.tf.
CACHE_DEV=/dev/disk/by-id/google-bench-cache
CACHE_MNT=/cache
# Weekly rotation: wipe the cache if the last-init marker is older than this.
# Prevents stale configs / accumulated target bloat / dependency drift from
# living forever. One slow cold-build per week is an acceptable trade.
CACHE_MAX_AGE_DAYS=7
if [ -e "$CACHE_DEV" ]; then
  echo "Setting up cache disk at $CACHE_DEV..."
  if ! blkid "$CACHE_DEV" >/dev/null 2>&1; then
    echo "Cache disk is unformatted; creating ext4 filesystem..."
    mkfs.ext4 -F -L bench-cache "$CACHE_DEV"
  fi
  mkdir -p "$CACHE_MNT"
  mount -o discard,defaults "$CACHE_DEV" "$CACHE_MNT"

  # Age-based wipe. The marker file's mtime is the time of the last fresh
  # init; if it's older than $CACHE_MAX_AGE_DAYS we nuke the contents and
  # reinitialize. Uses `find -mtime +N` which matches files whose mtime is
  # strictly more than N*24h ago.
  AGE_MARKER="$CACHE_MNT/.cache-initialized"
  if [ -f "$AGE_MARKER" ] \
     && [ -n "$(find "$AGE_MARKER" -mtime +"$CACHE_MAX_AGE_DAYS" -print 2>/dev/null)" ]; then
    echo "Cache marker is older than $CACHE_MAX_AGE_DAYS days; wiping cache..."
    find "$CACHE_MNT" -mindepth 1 -maxdepth 1 -exec rm -rf {} +
  fi
  if [ ! -f "$AGE_MARKER" ]; then
    echo "Initializing cache disk..."
    touch "$AGE_MARKER"
  fi

  mkdir -p "$CACHE_MNT/cargo" "$CACHE_MNT/rustup"
  chown -R runner:runner "$CACHE_MNT"

  # Point the runner user's cargo and rustup at the persistent cache.
  # Lands in the login profile so both the rustup installer below and
  # subsequent `su - runner` / workflow shells inherit them.
  cat > /home/runner/.profile <<'PROFILE_EOF'
# Managed by startup.sh — point cargo/rustup at the persistent cache disk.
# Notably does NOT set CARGO_TARGET_DIR: hypobench creates a worktree per
# side (baseline/candidate) and expects each worktree's build artifacts in
# its own relative `target/` dir. Forcing a shared target dir breaks
# hypobench's per-worktree binary discovery ("No benchmark binary found").
# Registry/toolchain caches alone still cover the bulk of the startup time.
export CARGO_HOME=/cache/cargo
export RUSTUP_HOME=/cache/rustup
export PATH="$CARGO_HOME/bin:$PATH"
# Read .bashrc for interactive features (GitHub Actions invokes bash).
if [ -n "$BASH_VERSION" ] && [ -f "$HOME/.bashrc" ]; then
  . "$HOME/.bashrc"
fi
PROFILE_EOF
  chown runner:runner /home/runner/.profile
else
  echo "WARNING: expected cache disk at $CACHE_DEV not found; rustup/cargo will use ephemeral boot disk"
fi

# Install Rust as runner user. With the cache disk mounted, subsequent boots
# skip the download/install (rustup detects the existing install and `rustup
# default` is idempotent).
echo "Installing Rust..."
su - runner -c 'curl --proto "=https" --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --no-modify-path --default-toolchain none'
su - runner -c 'rustup install nightly-2026-01-05 && rustup default nightly-2026-01-05'

# Get repo from instance metadata
echo "Fetching metadata..."
GITHUB_REPO=$(curl -sf -H "Metadata-Flavor: Google" \
  "http://metadata.google.internal/computeMetadata/v1/instance/attributes/github-repo")
echo "GitHub repo: ${GITHUB_REPO}"

# Fetch PAT from Secret Manager
echo "Fetching PAT from Secret Manager..."
PAT=$(gcloud secrets versions access latest --secret="github-runner-pat")

# Get ephemeral registration token
echo "Getting registration token..."
REG_TOKEN=$(curl -sf -X POST \
  -H "Authorization: token ${PAT}" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/${GITHUB_REPO}/actions/runners/registration-token" \
  | jq -r .token)

if [ -z "${REG_TOKEN}" ] || [ "${REG_TOKEN}" = "null" ]; then
  echo "ERROR: Failed to get registration token"
  exit 1
fi

# Download and configure runner
echo "Setting up GitHub Actions runner..."
RUNNER_DIR=/opt/actions-runner
mkdir -p "${RUNNER_DIR}"
cd "${RUNNER_DIR}"

RUNNER_VERSION=$(curl -sf https://api.github.com/repos/actions/runner/releases/latest | jq -r .tag_name | tr -d 'v')
echo "Runner version: ${RUNNER_VERSION}"

curl -o actions-runner.tar.gz -L \
  "https://github.com/actions/runner/releases/download/v${RUNNER_VERSION}/actions-runner-linux-x64-${RUNNER_VERSION}.tar.gz"
tar xzf actions-runner.tar.gz
rm actions-runner.tar.gz

# Change ownership to runner user
chown -R runner:runner "${RUNNER_DIR}"

# Install dependencies for runner
./bin/installdependencies.sh || true

# Configure as ephemeral runner (runs one job then exits)
echo "Configuring runner..."
su - runner -c "cd ${RUNNER_DIR} && ./config.sh \
  --url 'https://github.com/${GITHUB_REPO}' \
  --token '${REG_TOKEN}' \
  --labels 'self-hosted,gcp,benchmark' \
  --ephemeral \
  --unattended"

# === BENCHMARK STABILITY OPTIMIZATIONS ===

# 1. Let system settle after boot (services finish starting, caches warm)
echo "Waiting 60s for system to settle..."
sleep 60

# 2. Warmup compile to prime CPU caches and stabilize frequency.
# `su - runner` loads /home/runner/.profile which sets CARGO_HOME/PATH when
# the cache disk is mounted; otherwise rustup's default $HOME/.cargo/env is
# sourced as a fallback.
echo "Running warmup compile..."
su - runner -c 'command -v cargo >/dev/null || source "$HOME/.cargo/env"; cd /tmp && cargo init --name warmup warmup_project && cd warmup_project && cargo build --release 2>/dev/null'
rm -rf /tmp/warmup_project

# 3. Disable CPU frequency scaling - lock to max performance
echo "Configuring CPU for consistent performance..."
for cpu in /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor; do
  echo "performance" > "$cpu" 2>/dev/null || true
done

# 4. Run the runner pinned to CPU 1 (leave CPU 0 for OS tasks)
# This reduces interference from system processes
echo "Starting runner (pinned to CPU 1)..."
su - runner -c "cd ${RUNNER_DIR} && taskset -c 1 ./run.sh"

echo "=== Runner completed at $(date) ==="

# Shutdown the instance after job completes (instance group will handle recreation if needed)
shutdown -h now
