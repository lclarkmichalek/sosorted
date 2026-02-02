# Secret for GitHub Personal Access Token
# The actual secret value must be created manually:
#   echo -n "ghp_xxxxx" | gcloud secrets create github-runner-pat --data-file=-
# Or add a version to existing secret:
#   echo -n "ghp_xxxxx" | gcloud secrets versions add github-runner-pat --data-file=-

resource "google_secret_manager_secret" "github_pat" {
  secret_id = "github-runner-pat"

  replication {
    auto {}
  }

  depends_on = [google_project_service.secretmanager]
}

# IAM binding for runner VM to access the secret
resource "google_secret_manager_secret_iam_member" "runner_vm_access" {
  secret_id = google_secret_manager_secret.github_pat.secret_id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.runner_vm.email}"
}

# IAM binding for scaler function to access the secret
resource "google_secret_manager_secret_iam_member" "scaler_fn_access" {
  secret_id = google_secret_manager_secret.github_pat.secret_id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.scaler_fn.email}"
}
