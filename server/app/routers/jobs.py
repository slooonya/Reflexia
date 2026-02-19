from fastapi import APIRouter, HTTPException, Depends, status
from app.services.jobs_service import get_job
from app.dependencies.auth import get_current_user
from app.models.user import User


router = APIRouter(prefix="/api/jobs", tags=["jobs"])

@router.get("/{job_id}")
def read_job(job_id: str, user: User = Depends(get_current_user)):
  job = get_job(job_id)
  if not job or job["user_id"] != user.id:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")
  
  return job