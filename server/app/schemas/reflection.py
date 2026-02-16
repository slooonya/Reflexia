from pydantic import BaseModel


class ReflectionChatRequest(BaseModel):
  message: str
  step: int
  insight_id: str

class ReflectionStepUpdateRequest(BaseModel):
  insight_id: str
  step: int