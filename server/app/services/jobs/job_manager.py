jobs = {}

class JobManager:

  def create_job():
    import uuid
    job_id = str(uuid.uuid4())
    jobs[job_id] = {
      "status": "processing",
      "progress": 0
    }
    return job_id


  def update_progress(job_id, base, weight, index=None, total=None, status=None):
    if index is not None and total:
      percentage = base + int(weight * (index / total))
    else:
      percentage = base + weight

    job = jobs.get(job_id)
    if not job:
      return

    job["progress"] = max(0, min(100, int(percentage)))
      
    if status:
      job["status"] = status


  def finish_job(job_id):
    job = jobs.get(job_id)
    if job:
      job["progress"] = 100
      job["status"] = "done"


  def get_job(job_id):
    return jobs.get(job_id)