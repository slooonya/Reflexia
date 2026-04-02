import re
import httpx

from datetime import datetime, timedelta

# from youtube_transcript_api import YouTubeTranscriptApi
# from youtube_transcript_api._errors import TranscriptsDisabled, NoTranscriptFound

from app.core.config import settings


YT_RE = re.compile(r"https?://(?:www\.)?youtube\.com/watch\?v=([\w-]+)")
YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/videos"

class YouTubeService:

  client = httpx.AsyncClient(timeout=10)

  async def get_video_metadata(video_id: str) -> dict:
    try:
      params = {
        "part": "snippet",
        "id": video_id,
        "key": settings.YOUTUBE_API_KEY
      }
      
      response = await YouTubeService.client.get(YOUTUBE_URL, params=params)
      data = response.json()

    except Exception as e:
      print(f"Error processing {video_id}: {e}")
      return {}

    items = data.get("items", [])
    if not items:
      return {}
    
    snippet = items[0]["snippet"]
    title = snippet.get("title")
    description = snippet.get("description", "")
    keywords = snippet.get("tags", [])
    hashtags = [h for h in description.split() if h.startswith("#")]

    '''
    try:
      yt_api = YouTubeTranscriptApi()
      fetched_transcript = yt_api.fetch(video_id)
    
      transcript = " ".join([snippet.text for snippet in fetched_transcript]) if fetched_transcript else None
    
    except (TranscriptsDisabled, NoTranscriptFound):
      transcript = None
    except Exception as e:
      print(f"Transcript error for {video_id}: {e}")
      transcript = None
    '''

    return {
      "title": title,
      # "description": description,
      # "transcript": transcript,
      "keywords": keywords,
      # "hashtags": hashtags
    }
  

  def extract_video_ids(data: list, start: datetime, end: datetime) -> list[str]:
    video_ids = []

    for entry in data:
      if "details" in entry:
        continue

      time_str = entry.get("time")
      if not time_str:
        continue

      video_time = datetime.fromisoformat(time_str.replace("Z", "+00:00"))

      if not (start <= video_time <= end):
        continue

      url = entry.get("titleUrl")
      if not url:
        continue

      match = YT_RE.search(url)
      if not match:
        continue

      vid = match.group(1)
      if vid not in video_ids:
        video_ids.append(vid)

    return video_ids


  def get_latest_watch_time(data: list) -> datetime:
    times = [
      datetime.fromisoformat(e["time"].replace("Z", "+00:00"))
      for e in data if "time" in e
    ]

    return max(times)


  def create_week_intervals(data: list, n_weeks: int):
      base = YouTubeService.get_latest_watch_time(data)
      base = base.replace(hour=0, minute=0, second=0, microsecond=0)

      intervals = []

      for i in range(n_weeks):
          end = base - timedelta(days=7 * i)
          start = end - timedelta(days=7)
          intervals.append((start, end))

      return intervals
  

  def create_month_intervals(data: list, n_months: int):
    latest = YouTubeService.get_latest_watch_time(data)

    intervals = []
    current_end = latest

    for _ in range(n_months):
        start = current_end.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        intervals.append((start, current_end))
        current_end = start - timedelta(microseconds=1)

    return intervals