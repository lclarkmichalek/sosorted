"""
Cloud Function to scale GitHub Actions runner instances based on job queue.

Polls GitHub API for jobs that need self-hosted runners and scales the
instance group between 0 and 1 instances accordingly.
"""

import os

import functions_framework
import requests
from google.cloud import compute_v1, secretmanager


PROJECT = os.environ["GCP_PROJECT"]
ZONE = os.environ["GCP_ZONE"]
INSTANCE_GROUP = os.environ["INSTANCE_GROUP_NAME"]
GITHUB_REPO = os.environ["GITHUB_REPO"]
RUNNER_LABELS = os.environ.get("RUNNER_LABELS", "self-hosted,benchmark").split(",")


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


def get_instance_group_size() -> int:
    """Get current target size of the instance group."""
    client = compute_v1.InstanceGroupManagersClient()
    ig = client.get(project=PROJECT, zone=ZONE, instance_group_manager=INSTANCE_GROUP)
    return ig.target_size


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

    Checks GitHub for jobs needing self-hosted runners and scales the instance group:
    - Scale up to 1 if jobs are pending and no instances running
    - Scale down to 0 if no jobs are pending and instances are running
    """
    try:
        pat = get_github_pat()
        pending_jobs = get_pending_self_hosted_jobs(pat)
        current_size = get_instance_group_size()

        job_count = len(pending_jobs)

        if pending_jobs and current_size == 0:
            resize_instance_group(1)
            job_names = [j["name"] for j in pending_jobs[:3]]
            return f"Scaled up: {job_count} self-hosted job(s) pending: {job_names}", 200

        if not pending_jobs and current_size > 0:
            resize_instance_group(0)
            return "Scaled down: no self-hosted jobs pending", 200

        return f"No action: {job_count} self-hosted job(s), {current_size} instance(s)", 200

    except Exception as e:
        return f"Error: {e}", 500
