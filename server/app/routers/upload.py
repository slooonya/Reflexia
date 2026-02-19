from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, status, BackgroundTasks
from app.services.jobs_service import create_job
from app.services.upload_job_service import process_upload_job
from app.dependencies.auth import get_current_user
from app.models.user import User
import json


router = APIRouter(prefix="/api/upload", tags=["upload"])

@router.post("/watch-history")
async def upload_watch_history(
  file: UploadFile = File(...), 
  bg: BackgroundTasks = BackgroundTasks(), 
  user: User = Depends(get_current_user)
):
  if not file.filename.endswith(".json"):
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="File must be JSON")
  
  contents = await file.read()

  try:
    data = json.loads(contents)
  except:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid JSON file")
  
  job_id = create_job(user_id=user.id)
  bg.add_task(process_upload_job, job_id, data, user.id)

  return {"job_id": job_id}