variable "gcp_project" {
  description = "GCP project ID"
  type        = string
}

variable "github_repo" {
  description = "GitHub repository in owner/repo format"
  type        = string
}

variable "region" {
  description = "GCP region for resources"
  type        = string
  default     = "us-central1"
}

variable "zone" {
  description = "GCP zone for VM instances"
  type        = string
  default     = "us-central1-a"
}

variable "machine_type" {
  description = "Machine type for runner VMs"
  type        = string
  default     = "n2-standard-2"
}

variable "max_instances" {
  description = "Maximum number of runner instances"
  type        = number
  default     = 1
}
