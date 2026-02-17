from app.services.upload_service import extract_video_ids
from app.services.youtube_service import get_video_metadata
from app.services.ai_service import (
  generate_weekly_summary, generate_weekly_image_generation_prompt, 
  generate_monthly_summary, generate_monthly_image_generation_prompt, generate_image
)
from app.services.jobs_service import update_job
from app.models.insight import InsightEntry
from datetime import datetime
from tqdm import tqdm 


async def generate_weekly_insight(data, user_id, start, end, job_id, base, weight, index, total):
  def step(percentage, label):
    value = int(base + weight * percentage)
    update_job(job_id, value, label)

  step(0.0, f"Weekly insight {index}/{total}: extracting videos")

  video_ids = extract_video_ids(data, start, end)[:5] # TODO: This is to avoid wasting tokens. Remove this later

  metadata = []

  for i, video_id in enumerate(video_ids):
    step(0.25 + 0.3 * (i / max(len(video_ids), 1)), 
         f"Weekly insight {index}/{total}: fetching metadata {i + 1}/{len(video_ids)}")
    
    m = get_video_metadata(video_id)
    if m:
      metadata.append(m)

  if not metadata:
    return None
  
  step(0.55, f"Weekly insight {index}/{total}: generating summary")

  summary = generate_weekly_summary(metadata)

  step(0.75, f"Weekly insight {index}/{total}: generating image")

  image_prompt = generate_weekly_image_generation_prompt(summary)
  image_url = generate_image(image_prompt)

  step(0.95, f"Weekly insight {index}/{total}: saving")

  label = format_week_label(start, end)

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
    value = int(base + weight * percentage)
    update_job(job_id, value, label)

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
  summary = generate_monthly_summary(weekly_summaries)

  step(0.7, f"Monthly insight {index}/{total}: generating image")

  image_prompt = generate_monthly_image_generation_prompt(weekly_summaries)
  image_url = generate_image(image_prompt)

  start = chunk[0].period_start
  end = chunk[-1].period_end

  label = format_month_label(start)

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


def format_week_label(start: datetime, end: datetime) -> str:
  return f"{start.strftime('%b %d')} - {end.strftime('%b %d')}"


def format_month_label(date: datetime):
  return date.strftime("%b %Y")