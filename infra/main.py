"""
GitHub Actions Queue-Based Autoscaler - Cloud Function Entry Point
"""

import os
import json
from datetime import datetime, timedelta, timezone
from typing import Optional

import requests
from google.cloud import compute_v1
import functions_framework


class ScalerState:
    """Tracks autoscaler state using GCP metadata to enforce cooldown periods."""

    def __init__(self, project: str, zone: str, group_name: str, cooldown_seconds: int = 900):
        self.project = project
        self.zone = zone
        self.group_name = group_name
        self.cooldown_seconds = cooldown_seconds
        self.client = compute_v1.InstanceGroupManagersClient()

    def get_last_scale_time(self) -> Optional[datetime]:
        """Get last scale time from instance group metadata."""
        try:
            group = self.client.get(
                project=self.project,
                zone=self.zone,
                instance_group_manager=self.group_name
            )

            # Check metadata for last scale time
            if hasattr(group, 'metadata') and group.metadata:
                for item in group.metadata.items:
                    if item.key == 'last-scale-time':
                        return datetime.fromisoformat(item.value)
        except Exception as e:
            print(f"Could not get last scale time: {e}")

        return None

    def can_scale(self) -> bool:
        """Check if enough time has passed since last scale action."""
        last_scale_time = self.get_last_scale_time()
        if last_scale_time is None:
            return True

        elapsed = datetime.now(timezone.utc) - last_scale_time
        return elapsed.total_seconds() >= self.cooldown_seconds


def get_github_queue_depth(repo: str, token: str, labels: list[str]) -> int:
    """Get the number of queued GitHub Actions jobs."""
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json"
    }

    url = f"https://api.github.com/repos/{repo}/actions/runs"
    params = {"status": "queued", "per_page": 100}

    try:
        response = requests.get(url, headers=headers, params=params, timeout=10)
        response.raise_for_status()
        runs = response.json()["workflow_runs"]

        queued_count = 0
        for run in runs:
            jobs_url = f"https://api.github.com/repos/{repo}/actions/runs/{run['id']}/jobs"
            jobs_response = requests.get(jobs_url, headers=headers, timeout=10)
            jobs_response.raise_for_status()
            jobs = jobs_response.json()["jobs"]

            for job in jobs:
                if job["status"] == "queued":
                    job_labels = set(job.get("labels", []))
                    if all(label in job_labels for label in labels):
                        queued_count += 1

        return queued_count

    except requests.RequestException as e:
        print(f"Error fetching GitHub queue: {e}")
        return 0


def get_current_instance_group_size(project: str, zone: str, group_name: str) -> int:
    """Get the current target size of a managed instance group."""
    client = compute_v1.InstanceGroupManagersClient()

    try:
        group = client.get(
            project=project,
            zone=zone,
            instance_group_manager=group_name
        )
        return group.target_size
    except Exception as e:
        print(f"Error getting instance group size: {e}")
        return 0


def set_instance_group_size(project: str, zone: str, group_name: str, size: int) -> bool:
    """Set the target size of a managed instance group."""
    client = compute_v1.InstanceGroupManagersClient()

    try:
        operation = client.resize(
            project=project,
            zone=zone,
            instance_group_manager=group_name,
            size=size
        )

        operation.result(timeout=60)
        print(f"Scaled instance group to {size} instances")
        return True

    except Exception as e:
        print(f"Error scaling instance group: {e}")
        return False


def calculate_desired_size(queued_jobs: int, current_size: int, min_size: int, max_size: int) -> int:
    """Calculate the desired number of runners based on queue depth."""
    if queued_jobs == 0:
        return min_size

    desired = min(queued_jobs, max_size)

    # Don't scale down if we have queued jobs
    if desired < current_size and queued_jobs > 0:
        desired = current_size

    return max(min_size, desired)


@functions_framework.http
def scale(request):
    """HTTP Cloud Function entry point."""

    # Get configuration from environment variables
    project = os.environ.get('GCP_PROJECT', 'sosorted-bench')
    zone = os.environ.get('GCP_ZONE', 'us-central1-a')
    group = os.environ.get('INSTANCE_GROUP', 'runner-group')
    repo = os.environ.get('GITHUB_REPO', 'lclarkmichalek/sosorted')
    min_instances = int(os.environ.get('MIN_INSTANCES', '0'))
    max_instances = int(os.environ.get('MAX_INSTANCES', '5'))
    cooldown = int(os.environ.get('COOLDOWN_SECONDS', '900'))

    # Get GitHub token from Secret Manager
    from google.cloud import secretmanager
    secret_client = secretmanager.SecretManagerServiceClient()
    secret_name = f"projects/{project}/secrets/github-runner-pat/versions/latest"
    github_token = secret_client.access_secret_version(name=secret_name).payload.data.decode('UTF-8')

    labels = ['self-hosted', 'benchmark']
    state = ScalerState(project, zone, group, cooldown)

    # Get current state
    queued_jobs = get_github_queue_depth(repo, github_token, labels)
    current_size = get_current_instance_group_size(project, zone, group)

    print(f"Queue depth: {queued_jobs} jobs")
    print(f"Current instances: {current_size}")

    # Calculate desired size
    desired_size = calculate_desired_size(queued_jobs, current_size, min_instances, max_instances)
    print(f"Desired instances: {desired_size}")

    # Scale if needed and cooldown allows
    result = {"queued_jobs": queued_jobs, "current_size": current_size, "desired_size": desired_size}

    if desired_size != current_size:
        if state.can_scale():
            print(f"Scaling from {current_size} to {desired_size} instances...")
            if set_instance_group_size(project, zone, group, desired_size):
                result["action"] = "scaled"
                result["message"] = f"Scaled from {current_size} to {desired_size}"
            else:
                result["action"] = "error"
                result["message"] = "Failed to scale"
        else:
            print("Cooldown active - skipping scale action")
            result["action"] = "cooldown"
            result["message"] = "Cooldown period active"
    else:
        print("No scaling needed")
        result["action"] = "none"
        result["message"] = "No scaling needed"

    return json.dumps(result), 200, {'Content-Type': 'application/json'}
