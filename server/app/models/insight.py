from beanie import Document
from datetime import datetime
from typing import Literal, Optional

class InsightEntry(Document):
  user_id: Optional[str] = None # TODO: change to str when auth is added
  period_type: Literal["week", "month"]
  period_label: str
  period_start: Optional[datetime] = None
  period_end: Optional[datetime] = None
  summary: str
  image_url: Optional[str] = None

  class Settings:
    name = "insights"

  model_config = { 
    "json_schema_extra": { #TODO: add the missing fields 
      "example": {
        "user_id": "1",
        "period_type": "week",
        "period_label": "Jan 26 - Feb 1",
        "period_start": "",
        "period_end": "",
        "summary": "",
        "image_url": ""
      }
    }
  }