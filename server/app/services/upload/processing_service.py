from app.services.jobs.job_manager import JobManager
from app.services.upload.youtube_service import YouTubeService
from app.services.insights.insight_service import InsightService


class ProcessingService:

  async def process_upload_job(job_id, data, user_id, weeks, months):
    JobManager.update_progress(job_id, base=0, weight=5)
    
    JobManager.update_progress(job_id, base=5, weight=10)

    await ProcessingService.process_watch_history(data, user_id, job_id, weeks, months)

    JobManager.update_progress(job_id, base=90, weight=10)

    JobManager.finish_job(job_id)


  async def process_watch_history(data, user_id, job_id, weeks, months):
    insights = []

    week_intervals = YouTubeService.create_week_intervals(data, weeks)
    month_intervals = YouTubeService.create_month_intervals(data, months)
    
    weekly_weight = 55
    monthly_weight = 25

    weekly_total = len(week_intervals)
    monthly_total = len(month_intervals)

    weekly_step = (weekly_weight / weekly_total) if weekly_total else 0
    monthly_step = (monthly_weight / monthly_total) if monthly_total else 0

    for i, (start, end) in enumerate(week_intervals):
      base = 10 + weekly_step * i

      insight = await InsightService.generate_weekly_insight(data, user_id, start, end, job_id, base, weekly_step, 
                                                             index=i + 1, total=weekly_total)

      if insight:
        insights.append(insight) 

    for i, (start, end) in enumerate(month_intervals):
      base = 65 + monthly_step * i

      monthly = await InsightService.generate_monthly_insight(data, user_id, start, end, job_id, base, monthly_step, index=i + 1, total=monthly_total)
      
      if monthly:
        insights.append(monthly)

    return insights