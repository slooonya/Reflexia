from beanie import PydanticObjectId
from fastapi import APIRouter, UploadFile, File, HTTPException, status, BackgroundTasks
from app.services.jobs_service import create_job, get_job
from app.services.upload_job_service import process_upload_job
import json


router = APIRouter(prefix="/api/upload", tags=["upload"])

@router.post("/watch-history")
async def upload_watch_history(file: UploadFile = File(...), bg: BackgroundTasks = BackgroundTasks()):
  if not file.filename.endswith(".json"):
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="File must be JSON")
  
  contents = await file.read()

  try:
    data = json.loads(contents)
  except:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid JSON file")
  
  job_id = create_job()
  bg.add_task(process_upload_job, job_id, data, PydanticObjectId('698a317cd048c552a8f09b47'))

  return {"job_id": job_id}


@router.get("/upload-status/{job_id}")
async def upload_status(job_id: str):
  job = get_job(job_id)
  if not job:
    raise HTTPException(404)
  return job