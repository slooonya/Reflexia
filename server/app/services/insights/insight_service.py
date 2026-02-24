from fastapi import HTTPException, status

from app.services.jobs.job_manager import JobManager
from app.services.insights.insight_format_service import InsightFormatter
from app.services.ai_service import AIService
from app.services.upload.youtube_service import YouTubeService
from app.models.insight import InsightEntry
from app.schemas.insight import InsightCreate, InsightUpdate


class InsightService:

  async def create_insight(data: InsightCreate, user_id: str) -> InsightEntry:
    insight = InsightEntry(**data.model_dump(), user_id=user_id)
    await insight.insert()
    return insight
  

  async def get_insights(user_id: str, period_type: str | None = None):
    query = InsightEntry.find(InsightEntry.user_id == user_id)

    if period_type:
      query = query.find(InsightEntry.period_type == period_type)

    insights = await query.sort("-period_start").to_list()
    return insights
  

  async def get_insight(insight_id: str, user_id: str) -> InsightEntry:
    insight = await InsightEntry.get(insight_id)

    if not insight or insight.user_id != user_id:
      raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail=f"Insight with id {insight_id} not found"
      )
    
    return insight
  

  async def update_insight(insight: InsightEntry, data: InsightUpdate):
    update_data = data.model_dump(exclude_unset=True)

    for k, v in update_data.items():
      setattr(insight, k, v)

    await insight.save()
    return insight
    

  async def delete_insight(insight: InsightEntry):
    await insight.delete()

  
  async def edit_image(insight: InsightEntry, fixes: str) -> str:
    refined_prompt = await AIService.refine_image_prompt(insight.image_prompt, fixes)

    new_url = await AIService.generate_image(refined_prompt)

    insight.image_prompt = refined_prompt
    insight.image_url = new_url

    await insight.save()

    return new_url
    

  async def generate_weekly_insight(data, user_id, start, end, job_id, base, weight, index, total):
    def step(percentage, label):
      JobManager.update_progress(job_id, base, weight=weight * percentage, status=label)

    step(0.0, f"Weekly insight {index}/{total}: extracting videos")

    video_ids = YouTubeService.extract_video_ids(data, start, end)[:5] # TODO: This is to avoid wasting tokens. Remove this later

    metadata = []

    for i, video_id in enumerate(video_ids):
      step(0.25 + 0.3 * (i / max(len(video_ids), 1)), 
          f"Weekly insight {index}/{total}: fetching metadata {i + 1}/{len(video_ids)}")
      
      m = YouTubeService.get_video_metadata(video_id)
      if m:
        metadata.append(m)

    if not metadata:
      return None
    
    step(0.55, f"Weekly insight {index}/{total}: generating summary")

    summary = AIService.generate_weekly_summary(metadata)

    step(0.75, f"Weekly insight {index}/{total}: generating image")

    image_prompt = AIService.generate_weekly_image_generation_prompt(summary)
    image_url = AIService.generate_image(image_prompt)

    step(0.95, f"Weekly insight {index}/{total}: saving")

    label = InsightFormatter.format_week_label(start, end)

    insight = InsightEntry(
      user_id=user_id,
      period_type="week",
      period_label=label,
      period_start=start,
      period_end=end,
      summary=summary,
      image_url=image_url,
      image_prompt=image_prompt
    )

    await insight.insert()
    return insight


async def generate_monthly_insight(user_id, chunk_index, job_id, base, weight, index, total):
  def step(percentage, label):
      JobManager.update_progress(job_id, base, weight=weight * percentage, status=label)

  step(0.1, f"Monthly insight {index}/{total}: collecting weeks")

  weeks = await InsightEntry.find(
    InsightEntry.user_id == user_id,
    InsightEntry.period_type == "week"
  ).sort("period_start").to_list()

  start_idx = chunk_index * 5
  end_idx = start_idx + 5
  chunk = weeks[start_idx:end_idx]

  if len(chunk) < 5:
    return None

  step(0.4, f"Monthly insight {index}/{total}: generating summary")

  weekly_summaries = [week.summary for week in chunk]
  summary = AIService.generate_monthly_summary(weekly_summaries)

  step(0.7, f"Monthly insight {index}/{total}: generating image")

  image_prompt = AIService.generate_monthly_image_generation_prompt(weekly_summaries)
  image_url = AIService.generate_image(image_prompt)

  start = chunk[0].period_start
  end = chunk[-1].period_end

  label = InsightFormatter.format_month_label(start)

  step(1.0, f"Monthly insight {index}/{total}: saving")

  insight = InsightEntry(
    user_id=user_id,
    period_type="month",
    period_label=label,
    period_start=start,
    period_end=end,
    summary=summary,
    image_url=image_url,
    image_prompt=image_prompt
  )

  await insight.insert()
  return insight