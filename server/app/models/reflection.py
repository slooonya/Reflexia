from beanie import Document
from typing import List, Dict

class ReflectionSession(Document):
  user_id: str
  insight_id: str
  message: List[Dict]
  summary: str
  completed: bool = False

  class Settings:
    name = "reflection_sessions"