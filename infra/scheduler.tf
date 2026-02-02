# Service account for Cloud Scheduler
resource "google_service_account" "scheduler" {
  account_id   = "scheduler-sa"
  display_name = "Cloud Scheduler Service Account"
  description  = "Service account for Cloud Scheduler to invoke the scaler function"
}

# Get the project number for the Cloud Scheduler service agent
data "google_project" "current" {
  project_id = var.gcp_project
}

# Allow Cloud Scheduler service agent to create OIDC tokens for our scheduler SA
resource "google_service_account_iam_member" "scheduler_token_creator" {
  service_account_id = google_service_account.scheduler.name
  role               = "roles/iam.serviceAccountTokenCreator"
  member             = "serviceAccount:service-${data.google_project.current.number}@gcp-sa-cloudscheduler.iam.gserviceaccount.com"
}

# Cloud Scheduler job to trigger scaler every minute
resource "google_cloud_scheduler_job" "scale_runner" {
  name        = "scale-runner"
  description = "Trigger runner scaler function every minute"
  region      = var.region
  schedule    = "* * * * *" # Every minute

  http_target {
    uri         = google_cloudfunctions2_function.scaler.service_config[0].uri
    http_method = "POST"

    oidc_token {
      service_account_email = google_service_account.scheduler.email
      audience              = google_cloudfunctions2_function.scaler.service_config[0].uri
    }
  }

  retry_config {
    retry_count          = 1
    min_backoff_duration = "5s"
    max_backoff_duration = "10s"
  }

  depends_on = [
    google_project_service.cloudscheduler,
    google_cloudfunctions2_function.scaler,
  ]
}
