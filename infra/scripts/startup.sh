#!/bin/bash
set -euo pipefail

# Log all output
exec > >(tee -a /var/log/runner-startup.log) 2>&1
echo "=== Runner startup script started at $(date) ==="

# Install dependencies
echo "Installing dependencies..."
dnf install -y curl jq git

# Create runner user
echo "Creating runner user..."
useradd -m -s /bin/bash runner || true

# Install Rust as runner user
echo "Installing Rust..."
su - runner -c 'curl --proto "=https" --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y'
su - runner -c 'source $HOME/.cargo/env && rustup install nightly-2026-01-05 && rustup default nightly-2026-01-05'

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

# Run the runner (will exit after one job completes)
echo "Starting runner..."
su - runner -c "cd ${RUNNER_DIR} && ./run.sh"

echo "=== Runner completed at $(date) ==="

# Shutdown the instance after job completes (instance group will handle recreation if needed)
shutdown -h now
