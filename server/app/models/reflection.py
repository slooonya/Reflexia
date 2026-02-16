from beanie import Document
from typing import List, Dict

class ReflectionSession(Document):
  user_id: str
  insight_id: str
  messages: List[Dict]
  summary: str
  current_step: int = 0
  completed: bool = False

  class Settings:
    name = "reflection_sessions"