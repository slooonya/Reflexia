from app.models.insight import InsightEntry
from app.services.insight_service import generate_weekly_insight, generate_monthly_insight
from app.services.upload_service import create_week_intervals


async def process_watch_history(data, user_id, n_weeks):
  intervals = create_week_intervals(data, n_weeks)
  insights = []

  for start, end in intervals:
    insight = await generate_weekly_insight(data, user_id=user_id, start=start, end=end)

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

  for chunk_index in range(existing_monthly, monthly_total):
    monthly = await generate_monthly_insight(user_id, chunk_index)
    if monthly:
      insights.append(monthly)

  return insights