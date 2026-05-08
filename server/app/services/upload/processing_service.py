from app.models.insight import InsightEntry
from app.services.jobs.job_manager import JobManager
from app.services.upload.youtube_service import YouTubeService
from app.services.insights.insight_service import InsightService


class ProcessingService:

  async def process_upload_job(job_id, data, user_id):
    JobManager.update_progress(job_id, base=0, weight=5)
    
    JobManager.update_progress(job_id, base=5, weight=10)

    await ProcessingService.process_watch_history(data, user_id, job_id)

    JobManager.update_progress(job_id, base=90, weight=10)

    JobManager.finish_job(job_id)


  async def process_watch_history(data, user_id, job_id):
    insights = []

    # TODO: Change this to a longer time period later (6)
    week_intervals = YouTubeService.create_week_intervals(data, 1)
    
    weekly_total = len(week_intervals)
    weekly_base, weekly_weight = 10, 55

    for i, (start, end) in enumerate(week_intervals):
      base = weekly_base + (weekly_weight * i / weekly_total)
      weight = weekly_weight / weekly_total

      insight = await InsightService.generate_weekly_insight(data, user_id, start, end, job_id, base, weight, 
                                                             index=i+1, total=weekly_total)

      if insight:
        insights.append(insight) 

    # TODO: Change this to a longer time period later (6)
    month_intervals = YouTubeService.create_month_intervals(data, 0)

    monthly_total = len(month_intervals)
    monthly_base, monthly_weight = 65, 25

    for i, (start, end) in enumerate(month_intervals):
      base = monthly_base + monthly_weight * (i / monthly_total)
      weight = monthly_weight / monthly_total

      monthly = await InsightService.generate_monthly_insight(data, user_id, start, end, job_id, base, weight, index=i+1, total=monthly_total)
      
      if monthly:
        insights.append(monthly)

    return insights