import json

from fastapi import HTTPException, status

from app.services.jobs.job_manager import JobManager


class UploadService:

  async def handle_watch_history_upload(file, user_id):
    if not file.filename.endswith(".json"):
      raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="File must be JSON")

    contents = await file.read()

    try:
      data = json.loads(contents)   
    except:
      raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid JSON file")
  
    job_id = JobManager.create_job(user_id)

    return job_id, data