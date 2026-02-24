from fastapi import APIRouter, Depends, UploadFile, File, BackgroundTasks

from app.core.dependencies import get_current_user
from app.models.user import User
from app.services.upload.processing_service import ProcessingService
from app.services.upload.upload_service import UploadService


router = APIRouter(prefix="/api/upload", tags=["upload"])

@router.post("/watch-history")
async def upload_watch_history(
  file: UploadFile = File(...), 
  bg: BackgroundTasks = BackgroundTasks(), 
  user: User = Depends(get_current_user)
):
  job_id, data = await UploadService.handle_watch_history_upload(file, user.id)
  bg.add_task(ProcessingService.process_upload_job, job_id, data, str(user.id))

  return {"job_id": job_id}