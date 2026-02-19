from beanie import PydanticObjectId
from pydantic import BaseModel, ConfigDict
from typing import Literal, Optional
from datetime import datetime


class InsightCreate(BaseModel):
  period_type: Literal["week", "month"]
  period_label: str
  period_start: Optional[datetime] = None
  period_end: Optional[datetime] = None
  summary: Optional[str] = None
  image_url: Optional[str] = None


class InsightOut(BaseModel):
  id: PydanticObjectId
  period_type: str
  period_label: str
  summary: Optional[str]
  image_url: Optional[str]

  model_config = ConfigDict(
    from_attributes=True,
    populate_by_name=True
  )
    

class InsightUpdate(BaseModel):
  summary: Optional[str] = None
  image_url: Optional[str] = None


class ImageEditRequest(BaseModel):
  fixes: str