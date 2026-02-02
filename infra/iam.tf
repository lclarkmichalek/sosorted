# Service account for runner VMs
resource "google_service_account" "runner_vm" {
  account_id   = "runner-vm"
  display_name = "GitHub Actions Runner VM"
  description  = "Service account for self-hosted GitHub Actions runner VMs"
}

# Service account for scaler Cloud Function
resource "google_service_account" "scaler_fn" {
  account_id   = "scaler-fn"
  display_name = "Runner Scaler Function"
  description  = "Service account for Cloud Function that scales runner instances"
}

# Runner VM needs to access secrets
resource "google_project_iam_member" "runner_secret_accessor" {
  project = var.gcp_project
  role    = "roles/secretmanager.secretAccessor"
  member  = "serviceAccount:${google_service_account.runner_vm.email}"
}

# Scaler function needs to access secrets
resource "google_project_iam_member" "scaler_secret_accessor" {
  project = var.gcp_project
  role    = "roles/secretmanager.secretAccessor"
  member  = "serviceAccount:${google_service_account.scaler_fn.email}"
}

# Scaler function needs to resize instance groups
resource "google_project_iam_member" "scaler_compute_admin" {
  project = var.gcp_project
  role    = "roles/compute.instanceAdmin.v1"
  member  = "serviceAccount:${google_service_account.scaler_fn.email}"
}
