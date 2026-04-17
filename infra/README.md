# GitHub Actions Runner Infrastructure

This directory contains Terraform configuration for managing self-hosted GitHub Actions runners on Google Cloud Platform (GCP).

## Architecture Overview

### Components

1. **Managed Instance Group** - Auto-scaling pool of ephemeral GitHub Actions runners
2. **VPC Network** - Isolated network with restrictive firewall rules
3. **Service Accounts** - IAM roles for runner VMs and autoscaler
4. **Queue-Based Autoscaler** - Scales runners based on GitHub Actions job queue depth

### Design Principles

- **Ephemeral Runners**: Each runner handles exactly one job, then shuts down (prevents state contamination)
- **SPOT Instances**: Uses preemptible VMs for ~80% cost savings
- **Security**: Restrictive firewall rules (no SSH access, egress-only HTTPS/HTTP)
- **Performance Consistency**: CPU pinning, frequency scaling disabled, warmup compiles
- **Queue-Based Scaling**: Scales based on actual job queue and active busy runners, not CPU utilization

## Current Configuration

### Instance Settings
- **Machine Type**: n2-standard-2 (2 vCPU, 8 GB RAM)
- **Boot Disk**: 50 GB SSD
- **OS**: Ubuntu 22.04 LTS
- **Runtime**: Rust nightly-2026-01-05
- **Timeout**: 120 minutes (jobs forcibly killed after 2 hours)

### Autoscaling Settings
- **Min Instances**: 0 (scales to zero when idle)
- **Max Instances**: 5 (up to 5 parallel benchmark jobs)
- **Scheduler cadence**: every minute
- **Labels**: `self-hosted`, `gcp`, `benchmark`

### Network Configuration
- **Network**: `runner-network` (custom VPC)
- **Subnet**: `runner-subnet` (10.0.0.0/24, us-central1)
- **Egress**: Allow TCP/80, TCP/443 (HTTP/HTTPS)
- **Ingress**: Deny all (including SSH)

## Usage

### Prerequisites

1. **GCP Project**: `sosorted-bench`
2. **GitHub PAT Secret**: Store in Secret Manager as `github-runner-pat`
   ```bash
   echo -n "ghp_your_token_here" | gcloud secrets create github-runner-pat --data-file=-
   ```
3. **Terraform**: v1.0+
4. **gcloud CLI**: Authenticated with appropriate permissions

### Initial Setup

```bash
cd infra

# Initialize Terraform
terraform init

# Review planned changes
terraform plan

# Apply configuration
terraform apply
```

### Updating Configuration

Edit `variables.tf` or override in `terraform.tfvars`:

```hcl
# terraform.tfvars
max_runners = 10
runner_timeout_minutes = 180
machine_type = "n2-standard-4"
```

Then apply:
```bash
terraform apply
```

### Deploying Updates

When you update the startup script or instance configuration:

```bash
# Create new instance template and rolling update
terraform apply

# Force immediate recreation (optional, for urgent changes)
gcloud compute instance-groups managed rolling-action replace runner-group \
  --zone=us-central1-a \
  --max-unavailable=5
```

## Queue-Based Autoscaler

The autoscaler monitors the GitHub Actions job queue and scales the instance group accordingly.

### How It Works

1. **Cloud Scheduler** triggers the scaler every minute
2. **Scaler queries** GitHub API for jobs and runners with labels `self-hosted` + `benchmark`
3. **Scaling logic**:
   - 0 matching jobs and 0 busy matching runners → scale to min (0)
   - N queued/in-progress matching jobs → scale to N ephemeral VMs (capped at max = 5)
   - Busy matching runners keep at least one instance alive so active jobs are not terminated mid-run
4. **Instance group** adjusts size by creating/destroying VMs

### Manual Scaling (for testing)

```bash
# Scale to specific size
gcloud compute instance-groups managed resize runner-group \
  --size=3 \
  --zone=us-central1-a

# Check current size
gcloud compute instance-groups managed describe runner-group \
  --zone=us-central1-a \
  --format="value(targetSize)"
```

### Automated Queue-Based Scaling (Production)

**IMPORTANT: The autoscaler runs as a Cloud Function in Google Cloud, NOT on your local machine.**

The queue-based scaler is deployed and running:

- **Cloud Function**: `runner-scaler` (us-central1)
- **Cloud Scheduler**: `scale-runner` triggers every minute
- **Scaling Logic**: Scales runners to one VM per matching GitHub Actions job (0-5 instances)
- **Busy Runner Guard**: Keeps at least one instance alive while a matching runner is busy

#### Monitoring the Scaler

```bash
# View recent scaler logs
gcloud functions logs read runner-scaler --region=us-central1 --limit=20

# Check scheduler status
gcloud scheduler jobs describe scale-runner --location=us-central1

# Manually trigger (for testing)
gcloud scheduler jobs run scale-runner --location=us-central1
```

#### Updating the Scaler

```bash
cd /home/lcm/Code/sosorted/infra

# Modify the scaler source, then redeploy through Terraform:
terraform apply
```

### Scaler Logs

View Cloud Function logs:
```bash
gcloud functions logs read runner-scaler \
  --region=us-central1 \
  --limit=50
```

## Monitoring

### Check Runner Status

```bash
# List instances in the group
gcloud compute instance-groups managed list-instances runner-group \
  --zone=us-central1-a

# Check GitHub runners
gh api repos/lclarkmichalek/sosorted/actions/runners
```

### View Runner Logs

Runners log to `/var/log/runner-startup.log`. To view (requires enabling SSH temporarily):

```bash
# TEMPORARY: Allow SSH (disable after debugging)
gcloud compute firewall-rules create runner-allow-ssh-temp \
  --network=runner-network \
  --allow=tcp:22 \
  --source-ranges=YOUR_IP/32 \
  --priority=1000

# SSH to instance
gcloud compute ssh runner-XXXX --zone=us-central1-a

# View logs
sudo tail -f /var/log/runner-startup.log

# IMPORTANT: Remove SSH access when done
gcloud compute firewall-rules delete runner-allow-ssh-temp
```

### Monitor Costs

```bash
# Check instance costs (preemptible n2-standard-2 ≈ $0.02/hour)
gcloud compute instances list --filter="name:runner-*" \
  --format="table(name,zone,machineType,scheduling.preemptible,status)"
```

## Troubleshooting

### Jobs Stuck in Queue

**Symptom**: Jobs queued for >5 minutes with runners available

**Causes**:
1. Runner registration failed (check startup logs)
2. Labels mismatch (ensure workflow uses `runs-on: [self-hosted, benchmark]`)
3. Runner reached timeout (120m) and was killed

**Fix**:
```bash
# Check for stuck jobs
gh run list --repo lclarkmichalek/sosorted --limit 10

# Cancel stuck run
gh run cancel RUN_ID --repo lclarkmichalek/sosorted

# Check autoscaler status
gcloud compute instance-groups managed describe runner-group --zone=us-central1-a
```

### Autoscaler Not Scaling

**Symptom**: Jobs queued but instance group doesn't scale up

**Checks**:
1. Check Cloud Scheduler is triggering (should run every minute)
2. Verify the benchmark job labels still match `self-hosted` + `benchmark`
3. Review scaler logs for errors
4. Verify max_runners limit isn't reached

**Debug**:
```bash
# Check scheduler status
gcloud scheduler jobs describe scale-runner --location=us-central1

# Check recent executions
gcloud scheduler jobs describe scale-runner \
  --location=us-central1 \
  --format="value(state,lastAttemptTime)"

# Manual trigger
gcloud scheduler jobs run scale-runner --location=us-central1
```

### Runner Timeout Issues

**Symptom**: Jobs killed after 120 minutes

**Explanation**: Watchdog timer kills runner after 2 hours to prevent runaway jobs.

**Solutions**:
- Increase `runner_timeout_minutes` in `variables.tf` (then `terraform apply`)
- Optimize benchmark to run faster
- Split long benchmarks into multiple jobs

### High Costs

**Symptom**: Unexpected GCP bills

**Checks**:
1. Instances not scaling to zero when idle
2. Non-preemptible instances running (should all be SPOT)
3. Large boot disks (should be 50GB SSD)

**Fix**:
```bash
# Force scale to zero
gcloud compute instance-groups managed resize runner-group --size=0 --zone=us-central1-a

# Verify all instances are preemptible
gcloud compute instances list --filter="name:runner-*" \
  --format="value(scheduling.preemptible)"
```

## Configuration Files

- `main.tf` - Core infrastructure wiring
- `variables.tf` - Configurable parameters (max runners, machine type, etc.)
- `instance-template.tf` - VM initialization script and runner template
- `instance-group.tf` - Managed instance group for ephemeral runners
- `cloud-run.tf` - Cloud Function v2 / Cloud Run scaler deployment
- `scheduler.tf` - Cloud Scheduler trigger for the scaler
- `scaler/src/main.py` - Queue-based autoscaler logic

## Security Notes

- **No SSH Access**: Ingress firewall rules block all incoming connections (including SSH)
- **Egress-Only**: VMs can only make outbound HTTPS/HTTP connections
- **Secret Management**: GitHub PAT stored in Secret Manager, not in code
- **Service Account**: Minimal IAM permissions (Secret Accessor, Log Writer, Metric Writer)
- **Ephemeral Runners**: One job per VM prevents cross-job contamination
- **Auto-Shutdown**: VMs shutdown after job completes or timeout

## Cost Optimization

- **Preemptible/SPOT**: ~80% discount vs. standard VMs
- **Scale to Zero**: No cost when idle (min_runners = 0)
- **SSD Disks**: 50GB only (benchmarks don't need large storage)
- **Standard Network Tier**: Lower egress costs than Premium tier
- **Short-Lived VMs**: Ephemeral runners minimize per-instance costs

**Estimated Costs** (us-central1, as of 2026):
- n2-standard-2 preemptible: ~$0.02/hour
- 50GB SSD: ~$0.17/month
- 5 runners @ 100% utilization: ~$75/month
- Typical usage (few hours/day): ~$10-20/month

## Maintenance

### Update Runner Version

The startup script automatically installs the latest GitHub Actions runner. No action needed unless you want to pin a specific version.

### Update Rust Toolchain

Edit `startup-script.sh` and change:
```bash
rustup install nightly-2026-01-05 && rustup default nightly-2026-01-05
```

Then apply:
```bash
terraform apply
```

### Rotate GitHub PAT

```bash
# Create new PAT with 'repo' and 'admin:org' (if org-level) scopes
# Then update secret:
echo -n "ghp_new_token_here" | gcloud secrets versions add github-runner-pat --data-file=-

# Verify
gcloud secrets versions list github-runner-pat
```

## Related Resources

- [GitHub Actions Self-Hosted Runners](https://docs.github.com/en/actions/hosting-your-own-runners)
- [GCP Managed Instance Groups](https://cloud.google.com/compute/docs/instance-groups)
- [GCP Autoscaling](https://cloud.google.com/compute/docs/autoscaler)
- [Terraform GCP Provider](https://registry.terraform.io/providers/hashicorp/google/latest/docs)
