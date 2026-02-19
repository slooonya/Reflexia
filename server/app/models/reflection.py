from beanie import Document, PydanticObjectId
from typing import List, Dict

class ReflectionSession(Document):
  user_id: PydanticObjectId
  insight_id: PydanticObjectId
  messages: List[Dict]
  summary: str
  current_step: int = 0
  completed: bool = False

  class Settings:
    name = "reflection_sessions"