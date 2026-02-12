from fastapi import APIRouter, HTTPException
from app.services.jobs_service import get_job


router = APIRouter(prefix="/api/jobs", tags=["jobs"])

@router.get("/{job_id}")
def read_job(job_id: str):
  job = get_job(job_id)
  if not job:
    raise HTTPException(404, "Job not found")
  
  return job