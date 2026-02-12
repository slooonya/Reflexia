jobs = {}


def create_job():
  import uuid
  job_id = str(uuid.uuid4())
  jobs[job_id] = {
    "status": "processing",
    "progress": 0
  }
  return job_id


def update_job(job_id, progress=None, status=None):
  job = jobs.get(job_id)
  if not job:
    return
  
  if progress is not None:
   job["progress"] = max(0, min(100, int(progress)))

  if status:
    job["status"] = status


def finish_job(job_id):
  job = jobs.get(job_id)
  if not job:
      return

  job["progress"] = 100
  job["status"] = "done"


def get_job(job_id):
  return jobs.get(job_id)