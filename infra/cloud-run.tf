# Archive the function source code
data "archive_file" "scaler_source" {
  type        = "zip"
  source_dir  = "${path.module}/scaler/src"
  output_path = "${path.module}/scaler-source.zip"
}

# GCS bucket for function source
resource "google_storage_bucket" "function_source" {
  name     = "${var.gcp_project}-function-source"
  location = var.region

  uniform_bucket_level_access = true

  lifecycle_rule {
    condition {
      age = 30
    }
    action {
      type = "Delete"
    }
  }
}

# Upload function source to GCS
resource "google_storage_bucket_object" "scaler_source" {
  name   = "scaler-${data.archive_file.scaler_source.output_md5}.zip"
  bucket = google_storage_bucket.function_source.name
  source = data.archive_file.scaler_source.output_path
}

# Cloud Function (2nd gen) for scaling
resource "google_cloudfunctions2_function" "scaler" {
  name     = "runner-scaler"
  location = var.region

  build_config {
    runtime     = "python312"
    entry_point = "scale_runner"

    source {
      storage_source {
        bucket = google_storage_bucket.function_source.name
        object = google_storage_bucket_object.scaler_source.name
      }
    }
  }

  service_config {
    min_instance_count = 0
    max_instance_count = 1
    timeout_seconds    = 60
    available_memory   = "1Gi"
    available_cpu      = "1"

    environment_variables = {
      GCP_PROJECT         = var.gcp_project
      GCP_ZONE            = var.zone
      INSTANCE_GROUP_NAME = google_compute_instance_group_manager.runner.name
      GITHUB_REPO         = var.github_repo
      RUNNER_LABELS       = "self-hosted,benchmark"
    }

    service_account_email = google_service_account.scaler_fn.email
  }

  depends_on = [
    google_project_service.cloudfunctions,
    google_project_service.cloudbuild,
    google_project_service.run,
  ]
}

# Allow Cloud Scheduler to invoke the function
resource "google_cloud_run_service_iam_member" "scheduler_invoker" {
  location = google_cloudfunctions2_function.scaler.location
  service  = google_cloudfunctions2_function.scaler.name
  role     = "roles/run.invoker"
  member   = "serviceAccount:${google_service_account.scheduler.email}"
}
