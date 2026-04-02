from beanie import Document, PydanticObjectId
from typing import List, Dict, Optional

class ReflectionSession(Document):
  user_id: PydanticObjectId
  insight_id: PydanticObjectId
  messages: List[Dict]
  conversation_summary: Optional[str] = ""
  reflection_summary: Optional[str] = ""
  current_step: int = 0
  completed: bool = False

  class Settings:
    name = "reflection_sessions"