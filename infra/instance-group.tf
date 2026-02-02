# Managed instance group for GitHub Actions runners
resource "google_compute_instance_group_manager" "runner" {
  name               = "runner-group"
  base_instance_name = "runner"
  zone               = var.zone

  version {
    instance_template = google_compute_instance_template.runner.id
  }

  # Start with 0 instances - scaler function will scale up when jobs are queued
  target_size = 0

  # Named port for potential health checks (not currently used)
  named_port {
    name = "http"
    port = 8080
  }

  # Wait for instances to be created before considering the group ready
  wait_for_instances = false

  lifecycle {
    # Prevent Terraform from resetting target_size, which is managed by the scaler
    ignore_changes = [target_size]
  }
}
