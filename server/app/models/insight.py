from beanie import Document
from typing import Literal, List, Optional

class InsightEntry(Document):
  user_id: str
  period_type: Literal["week", "month"]
  period_label: str
  themes: List[str]
  summary: str
  image_url: Optional[str] = None

  class Settings:
    name = "insights"