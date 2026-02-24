from fastapi import APIRouter, HTTPException, Depends, status

from app.core.dependencies import get_current_user
from app.models.user import User
from app.services.jobs.job_manager import JobManager


router = APIRouter(prefix="/api/jobs", tags=["jobs"])

@router.get("/{job_id}")
def read_job(job_id: str, user: User = Depends(get_current_user)):
  job = JobManager.get_job(job_id)
  if not job or job["user_id"] != user.id:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")
  
  return job