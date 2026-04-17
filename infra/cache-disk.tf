# Persistent cache disk for the benchmark runner.
#
# Mounted at /cache on each ephemeral VM so cargo/rustup state survives
# across VM lifetimes. Cuts per-job startup overhead (rustup install,
# `cargo install hypobench`, rebuilding common dependencies) from minutes
# to seconds once the cache is warm.
#
# A regional disk is used here (rather than zonal) because
# google_compute_instance_template is a regional resource and rejects
# zonal disks as attached-disk sources. Regional disks are replicated
# across two zones so any in-region instance can mount them; this roughly
# doubles the disk cost versus a zonal pd-balanced (~$4/mo instead of $2).
#
# Concurrency note: a pd-balanced in READ_WRITE mode can only be attached
# to one VM at a time. This works for us because the MIG is pinned to
# max_instances = 1 (see variables.tf / terraform.tfvars). Raising
# max_instances without migrating to a stateful MIG with per-instance
# disks will cause concurrent scale-up attempts to fail with
# RESOURCE_IN_USE.
resource "google_compute_region_disk" "bench_cache" {
  name          = "bench-runner-cache"
  type          = "pd-balanced"
  region        = var.region
  size          = 20
  replica_zones = ["${var.region}-a", "${var.region}-b"]

  lifecycle {
    # Losing the cache is inconvenient but not destructive. Allow Terraform
    # to recreate if (for example) type/size change.
    prevent_destroy = false
  }
}
