from googleapiclient.discovery import build
from app.core.config import settings
# from youtube_transcript_api import YouTubeTranscriptApi
# from youtube_transcript_api._errors import TranscriptsDisabled, NoTranscriptFound

youtube = build(
  "youtube", "v3",
  developerKey=settings.YOUTUBE_API_KEY
)

def get_video_metadata(video_id: str) -> dict:
  try:
    response = youtube.videos().list(
      part="snippet",
      id=video_id
    ).execute()

    items = response.get("items", [])
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

  except Exception as e:
    print(f"Error processing {video_id}: {e}")
    return {}