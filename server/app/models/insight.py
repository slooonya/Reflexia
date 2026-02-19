from beanie import Document, PydanticObjectId
from datetime import datetime
from typing import Literal, Optional


class InsightEntry(Document):
  user_id: PydanticObjectId
  period_type: Literal["week", "month"]
  period_label: str
  period_start: Optional[datetime] = None
  period_end: Optional[datetime] = None
  summary: str
  image_url: Optional[str] = None
  image_prompt: Optional[str] = None

  class Settings:
    name = "insights"