from app.services.upload_service import extract_video_ids
from app.services.youtube_service import get_video_metadata
from app.services.ai_service import (
  generate_weekly_summary, generate_weekly_image_generation_prompt, 
  generate_monthly_summary, generate_monthly_image_generation_prompt, generate_image
)
from app.models.insight import InsightEntry
from datetime import datetime
from tqdm import tqdm 


async def generate_weekly_insight(data: list, user_id: str, start: datetime, end: datetime):
  video_ids = extract_video_ids(data, start, end)[:30] # TODO: This is to avoid wasting tokens. Remove this later

  metadata = [get_video_metadata(video_id) for video_id in tqdm(video_ids, "Fetching metadata")]
  metadata = [m for m in metadata if m]

  print(metadata[0])

  if not metadata:
    return None

  summary = generate_weekly_summary(metadata)
  image_prompt = generate_weekly_image_generation_prompt(summary)
  image_url = generate_image(image_prompt)

  label = format_week_label(start, end)

  insight = InsightEntry(
    user_id=user_id,
    period_type="week",
    period_label=label,
    period_start=start,
    period_end=end,
    summary=summary,
    image_url=image_url
  )

  await insight.insert()
  return insight


async def generate_monthly_insight(user_id: str, chunk_index: int):
  weeks = await InsightEntry.find(
    InsightEntry.user_id == user_id,
    InsightEntry.period_type == "week"
  ).sort("period_start").to_list()

  start_idx = chunk_index * 5
  end_idx = start_idx + 5
  chunk = weeks[start_idx:end_idx]

  if len(chunk) < 5:
    return None

  weekly_summaries = [week.summary for week in chunk]
  summary = generate_monthly_summary(weekly_summaries)

  image_prompt = generate_monthly_image_generation_prompt(weekly_summaries)
  image_url = generate_image(image_prompt)

  start = chunk[0].period_start
  end = chunk[-1].period_end

  label = format_month_label(start)

  insight = InsightEntry(
    user_id=user_id,
    period_type="month",
    period_label=label,
    period_start=start,
    period_end=end,
    summary=summary,
    image_url=image_url
  )

  await insight.insert()
  return insight


def format_week_label(start: datetime, end: datetime) -> str:
  return f"{start.strftime('%b %d')} - {end.strftime('%b %d')}"


def format_month_label(date: datetime):
  return date.strftime("%b %Y")