from app.services.jobs_service import finish_job
from app.services.watch_history_service import process_watch_history
from app.services.upload_service import create_week_intervals
from app.services.job_progress import set_progress


async def process_upload_job(job_id, data, user_id):
  set_progress(job_id, base=0, weight=5)
  
  # TODO: setting the time period to one week to avoid token waste, change this to a longer time period later
  intervals = create_week_intervals(data, 1)
  set_progress(job_id, base=5, weight=10)

  await process_watch_history(data, user_id, intervals, job_id)

  set_progress(job_id, base=90, weight=10)

  finish_job(job_id)