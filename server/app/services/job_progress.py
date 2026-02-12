from app.services.jobs_service import update_job


def set_progress(job_id, base, weight, index=None, total=None):
  if index is not None and total:
    percentage = base + int(weight * (index / total))
  else:
    percentage = base + weight

  update_job(job_id, percentage)