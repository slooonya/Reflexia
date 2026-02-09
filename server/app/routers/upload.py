from fastapi import APIRouter, UploadFile, File, HTTPException, status
from app.models.to_out_util import to_out
from app.services.watch_history_service import process_watch_history
import json


router = APIRouter(prefix="/upload", tags=["upload"])

@router.post("/watch-history")
async def upload_watch_history(file: UploadFile = File(...)):
  if not file.filename.endswith(".json"):
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="File must be JSON")
  
  contents = await file.read()

  try:
    data = json.loads(contents)
  except:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid JSON file")

  # TODO: setting the time period to one week to avoid token waste, change this to a longer time period later
  insights = await process_watch_history(
    data=data, user_id="1", n_weeks=1
  )

  return [to_out(insight) for insight in insights]