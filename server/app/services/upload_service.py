import re
from datetime import datetime, timedelta

yt_re = re.compile(r"https?://(?:www\.)?youtube\.com/watch\?v=([\w-]+)")

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

    match = yt_re.search(url)
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
    base = get_latest_watch_time(data)
    base = base.replace(hour=0, minute=0, second=0, microsecond=0)

    intervals = []

    for i in range(n_weeks):
        end = base - timedelta(days=7 * i)
        start = end - timedelta(days=7)
        intervals.append((start, end))

    return intervals