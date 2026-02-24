from app.models.insight import InsightEntry
from app.services.jobs.job_manager import JobManager
from app.services.upload.youtube_service import YouTubeService
from app.services.insights.insight_service import InsightService


class ProcessingService:

  async def process_upload_job(job_id, data, user_id):
    JobManager.update_progress(job_id, base=0, weight=5)
    
    # TODO: setting the time period to one week to avoid token waste, change this to a longer time period later
    intervals = YouTubeService.create_week_intervals(data, 1)
    JobManager.update_progress(job_id, base=5, weight=10)

    await ProcessingService.process_watch_history(data, user_id, intervals, job_id)

    JobManager.update_progress(job_id, base=90, weight=10)

    JobManager.finish_job(job_id)


  async def process_watch_history(data, user_id, intervals, job_id):
    insights = []
    total = len(intervals)

    weekly_base, weekly_weight = 10, 55

    for i, (start, end) in enumerate(intervals):
      insight_progress_base = weekly_base + (weekly_weight * i / total)
      insight_progress_weight = weekly_weight / total

      insight = await InsightService.generate_weekly_insight(data, user_id, start, end, job_id, base=insight_progress_base, 
                                              weight=insight_progress_weight, index=i+1, total=total)

      if insight:
        insights.append(insight) 
    
    weekly_count = await InsightEntry.find(
      InsightEntry.user_id == user_id,
      InsightEntry.period_type == "week"
    ).count()

    monthly_total = weekly_count // 5
    existing_monthly = await InsightEntry.find(
      InsightEntry.user_id == user_id,
      InsightEntry.period_type == "month"
    ).count()

    monthly_base, monthly_weight = 65, 25

    for chunk_index in range(existing_monthly, monthly_total):
      base = monthly_base + monthly_weight * (chunk_index / monthly_total)
      weight = monthly_weight / monthly_total

      monthly = await InsightService.generate_monthly_insight(user_id, chunk_index, job_id, base, 
                                              weight, index=chunk_index+1, total=monthly_total)
      if monthly:
        insights.append(monthly)

    return insights