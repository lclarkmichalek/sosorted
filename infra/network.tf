# VPC network for runner VMs
resource "google_compute_network" "runner" {
  name                    = "runner-network"
  auto_create_subnetworks = false
  description             = "VPC network for GitHub Actions runner VMs"

  depends_on = [google_project_service.compute]
}

# Subnet for runner VMs
resource "google_compute_subnetwork" "runner" {
  name          = "runner-subnet"
  ip_cidr_range = "10.0.0.0/24"
  region        = var.region
  network       = google_compute_network.runner.id

  # Enable Private Google Access for accessing GCP APIs without external IP
  private_ip_google_access = true
}

# Firewall rule: allow egress HTTPS (for GitHub API, package downloads, etc.)
resource "google_compute_firewall" "allow_egress_https" {
  name    = "runner-allow-egress-https"
  network = google_compute_network.runner.name

  direction = "EGRESS"
  priority  = 1000

  allow {
    protocol = "tcp"
    ports    = ["443"]
  }

  destination_ranges = ["0.0.0.0/0"]
  description        = "Allow outbound HTTPS traffic for GitHub API and package downloads"
}

# Firewall rule: allow egress HTTP (for package downloads that may use HTTP)
resource "google_compute_firewall" "allow_egress_http" {
  name    = "runner-allow-egress-http"
  network = google_compute_network.runner.name

  direction = "EGRESS"
  priority  = 1000

  allow {
    protocol = "tcp"
    ports    = ["80"]
  }

  destination_ranges = ["0.0.0.0/0"]
  description        = "Allow outbound HTTP traffic for package downloads"
}

# Deny all ingress by default (implicit in GCP, but explicit for clarity)
resource "google_compute_firewall" "deny_ingress_all" {
  name    = "runner-deny-ingress-all"
  network = google_compute_network.runner.name

  direction = "INGRESS"
  priority  = 65534

  deny {
    protocol = "all"
  }

  source_ranges = ["0.0.0.0/0"]
  description   = "Deny all inbound traffic - runners only need outbound access"
}
