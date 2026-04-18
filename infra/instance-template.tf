# Instance template for GitHub Actions runner VMs
resource "google_compute_instance_template" "runner" {
  name_prefix  = "runner-"
  machine_type = var.machine_type
  region       = var.region

  # Use preemptible instances for cost savings
  scheduling {
    preemptible                 = true
    automatic_restart           = false
    on_host_maintenance         = "TERMINATE"
    provisioning_model          = "SPOT"
    instance_termination_action = "STOP"
  }

  disk {
    source_image = "projects/ubuntu-os-cloud/global/images/family/ubuntu-2204-lts"
    auto_delete  = true
    boot         = true
    disk_type    = "pd-ssd"
    disk_size_gb = 50
  }

  # Persistent cache disk — survives VM lifetimes to avoid rebuilding the
  # cargo/rustup state and common dependencies on every job.
  #
  # Exposed to the VM as /dev/disk/by-id/google-bench-cache (see device_name).
  # See cache-disk.tf for the disk resource itself and scripts/startup.sh
  # for the mount logic.
  disk {
    source      = google_compute_region_disk.bench_cache.self_link
    device_name = "bench-cache"
    auto_delete = false
    boot        = false
    mode        = "READ_WRITE"
  }

  network_interface {
    subnetwork = google_compute_subnetwork.runner.id

    # Assign external IP for internet access (GitHub API, package downloads)
    access_config {
      network_tier = "STANDARD"
    }
  }

  service_account {
    email  = google_service_account.runner_vm.email
    scopes = ["cloud-platform"]
  }

  metadata = {
    github-repo    = var.github_repo
    startup-script = file("${path.module}/scripts/startup.sh")
  }

  labels = {
    purpose = "github-actions-runner"
  }

  # Create new template before destroying old one
  lifecycle {
    create_before_destroy = true
  }

  depends_on = [
    google_project_service.compute,
    google_secret_manager_secret.github_pat
  ]
}
