"""
Cloud Function to scale GitHub Actions runner instances based on job queue.

Polls GitHub API for jobs that need self-hosted runners and scales the
instance group between 0 and 1 instances accordingly.
"""

import os
from datetime import datetime, timezone

import functions_framework
import requests
from google.cloud import compute_v1, secretmanager


PROJECT = os.environ["GCP_PROJECT"]
ZONE = os.environ["GCP_ZONE"]
INSTANCE_GROUP = os.environ["INSTANCE_GROUP_NAME"]
GITHUB_REPO = os.environ["GITHUB_REPO"]
RUNNER_LABELS = os.environ.get("RUNNER_LABELS", "self-hosted,benchmark").split(",")
MIN_INSTANCES = int(os.environ.get("MIN_INSTANCES", "0"))
MAX_INSTANCES = int(os.environ.get("MAX_INSTANCES", "1"))
STARTUP_GRACE_SECONDS = int(os.environ.get("STARTUP_GRACE_SECONDS", "300"))


def get_github_pat() -> str:
    """Fetch GitHub PAT from Secret Manager."""
    client = secretmanager.SecretManagerServiceClient()
    secret_name = f"projects/{PROJECT}/secrets/github-runner-pat/versions/latest"
    response = client.access_secret_version(name=secret_name)
    return response.payload.data.decode("utf-8")


def get_pending_self_hosted_jobs(pat: str) -> list:
    """Get jobs that are waiting for self-hosted runners."""
    headers = {
        "Authorization": f"token {pat}",
        "Accept": "application/vnd.github.v3+json",
    }

    # Get workflow runs that are queued or in_progress
    pending_jobs = []

    for status in ["queued", "in_progress"]:
        url = f"https://api.github.com/repos/{GITHUB_REPO}/actions/runs"
        params = {"status": status, "per_page": 20}

        response = requests.get(url, headers=headers, params=params, timeout=30)
        response.raise_for_status()

        runs = response.json().get("workflow_runs", [])

        # For each run, check its jobs
        for run in runs:
            jobs_url = run.get("jobs_url")
            if not jobs_url:
                continue

            jobs_response = requests.get(jobs_url, headers=headers, timeout=30)
            jobs_response.raise_for_status()

            jobs = jobs_response.json().get("jobs", [])

            for job in jobs:
                # Check if job is queued or in_progress
                if job.get("status") not in ["queued", "in_progress"]:
                    continue

                # Check if job needs our self-hosted runner (has matching labels)
                # Labels are a list of strings, e.g. ["self-hosted", "benchmark"]
                job_labels = job.get("labels", [])

                # Job needs self-hosted runner if it has all our required labels
                if all(label in job_labels for label in RUNNER_LABELS):
                    pending_jobs.append({
                        "id": job.get("id"),
                        "name": job.get("name"),
                        "status": job.get("status"),
                        "labels": job_labels,
                    })

    return pending_jobs


def get_matching_runners(pat: str) -> list:
    """Get GitHub runners that advertise the labels managed by this scaler."""
    headers = {
        "Authorization": f"token {pat}",
        "Accept": "application/vnd.github.v3+json",
    }

    url = f"https://api.github.com/repos/{GITHUB_REPO}/actions/runners"
    response = requests.get(url, headers=headers, params={"per_page": 100}, timeout=30)
    response.raise_for_status()

    runners = response.json().get("runners", [])
    matching = []

    for runner in runners:
        runner_labels = [label.get("name") for label in runner.get("labels", [])]
        if all(label in runner_labels for label in RUNNER_LABELS):
            matching.append({
                "name": runner.get("name"),
                "status": runner.get("status"),
                "busy": runner.get("busy", False),
            })

    return matching


def get_instance_group_size() -> int:
    """Get current target size of the instance group."""
    client = compute_v1.InstanceGroupManagersClient()
    ig = client.get(project=PROJECT, zone=ZONE, instance_group_manager=INSTANCE_GROUP)
    return ig.target_size


def get_instance_group_instances() -> list:
    """Get instances currently managed by the runner instance group."""
    client = compute_v1.InstanceGroupManagersClient()
    instances_client = compute_v1.InstancesClient()
    managed_instances = client.list_managed_instances(
        project=PROJECT,
        zone=ZONE,
        instance_group_manager=INSTANCE_GROUP,
    )

    instances = []
    for managed in managed_instances:
        instance_url = managed.instance
        if not instance_url:
            continue

        instance_name = instance_url.rsplit("/", 1)[-1]
        instance = instances_client.get(project=PROJECT, zone=ZONE, instance=instance_name)
        instances.append({
            "name": instance_name,
            "creation_timestamp": instance.creation_timestamp,
        })

    return instances


def has_recent_instance_start(instances: list) -> bool:
    """Return True when any managed instance is still within the startup grace period."""
    now = datetime.now(timezone.utc)

    for instance in instances:
        created_at = instance.get("creation_timestamp")
        if not created_at:
            continue

        created = datetime.fromisoformat(created_at.replace("Z", "+00:00"))
        if (now - created).total_seconds() < STARTUP_GRACE_SECONDS:
            return True

    return False


def resize_instance_group(size: int) -> None:
    """Resize the instance group to the specified size."""
    client = compute_v1.InstanceGroupManagersClient()
    client.resize(
        project=PROJECT,
        zone=ZONE,
        instance_group_manager=INSTANCE_GROUP,
        size=size,
    )


@functions_framework.http
def scale_runner(request):
    """
    HTTP Cloud Function to scale runner instances.

    Checks GitHub for jobs needing self-hosted runners and scales the instance group
    to one ephemeral VM per matching job, capped by the configured min/max bounds.
    """
    try:
        pat = get_github_pat()
        pending_jobs = get_pending_self_hosted_jobs(pat)
        matching_runners = get_matching_runners(pat)
        current_size = get_instance_group_size()
        current_instances = get_instance_group_instances()

        job_count = len(pending_jobs)
        desired_size = max(MIN_INSTANCES, min(job_count, MAX_INSTANCES))
        busy_runners = [runner for runner in matching_runners if runner["busy"]]
        if busy_runners:
            desired_size = max(desired_size, min(len(busy_runners), MAX_INSTANCES))

        if current_size > 0 and has_recent_instance_start(current_instances):
            desired_size = max(desired_size, current_size)

        if desired_size != current_size:
            resize_instance_group(desired_size)
            job_names = [j["name"] for j in pending_jobs[:3]]
            return (
                f"Resized runner group from {current_size} to {desired_size}: "
                f"{job_count} self-hosted job(s), {len(busy_runners)} busy runner(s): {job_names}",
                200,
            )

        return (
            f"No action: {job_count} self-hosted job(s), {len(busy_runners)} busy runner(s), "
            f"{current_size} instance(s), desired size {desired_size}",
            200,
        )

    except Exception as e:
        return f"Error: {e}", 500
