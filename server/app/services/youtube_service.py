import requests
from app.core.config import settings
# from youtube_transcript_api import YouTubeTranscriptApi
# from youtube_transcript_api._errors import TranscriptsDisabled, NoTranscriptFound

YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/videos"

def get_video_metadata(video_id: str) -> dict:
  try:
    params = {
      "part": "snippet",
      "id": video_id,
      "key": settings.YOUTUBE_API_KEY
    }

    response = requests.get(YOUTUBE_URL, params=params, timeout=10)
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