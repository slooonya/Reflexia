from datetime import datetime


class InsightFormatter:

  def format_week_label(start: datetime, end: datetime) -> str:
    return f"{start.strftime('%b %d')} - {end.strftime('%b %d')}"


  def format_month_label(date: datetime):
    return date.strftime("%b %Y")