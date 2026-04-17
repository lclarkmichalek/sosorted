output "instance_group_url" {
  description = "URL of the managed instance group"
  value       = google_compute_instance_group_manager.runner.self_link
}

output "scaler_function_url" {
  description = "URL of the Cloud Function that scales the runner"
  value       = google_cloudfunctions2_function.scaler.url
}

output "scaler_function_uri" {
  description = "URI of the Cloud Function (for Cloud Scheduler)"
  value       = google_cloudfunctions2_function.scaler.service_config[0].uri
}
