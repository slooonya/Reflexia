from pydantic import BaseModel
from typing import Literal, Optional
from datetime import datetime


class InsightCreate(BaseModel):
  period_type: Literal["week", "month"]
  period_label: str
  period_start: Optional[datetime] = None
  period_end: Optional[datetime] = None
  summary: Optional[str] = None
  image_url: Optional[str] = None

  model_config = {
    "json_schema_extra": { #TODO: add the missing fields
      "example": {
        "period_type": "month",
        "period_label": "February",
        "period_start": "",
        "period_end": "",
        "summary": "",
        "image_url": ""
      }
    }
  }  

class InsightOut(BaseModel):
  id: str
  period_type: str
  period_label: str
  summary: Optional[str]
  image_url: Optional[str]

  model_config = {  
    "from_attributes": True,
    "json_schema_extra": { #TODO: add the missing fields
      "example": {
        "id": "1",
        "period_type": "month",
        "period_label": "February",
        "summary": "",
        "image_url": ""
      }
    }
  } 
    

class InsightUpdate(BaseModel):
  summary: Optional[str] = None
  image_url: Optional[str] = None

  model_config = { 
    "json_schema_extra": { #TODO: add the missing fields 
      "example": {
        "summary": "",
        "image_url": ""
      }
    }
  }
    