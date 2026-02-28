from fastapi import HTTPException, status
from beanie import PydanticObjectId

from app.models.reflection import ReflectionSession
from app.services.ai_service import AIService


class ReflectionService:

  async def handle_chat(user_id: str, insight_id: str, step: int, message: str):
    session = await ReflectionService.get_or_create_reflection_session(user_id, insight_id)

    session.current_step = step

    session.messages.append({
      "role": "user",
      "content": message,
      "step": step
    })

    reply = await AIService.generate_chat_reply(session.messages, step)

    session.messages.append({
      "role": "system",
      "content": reply,
      "step": step
    })

    await session.save()

    return { 
      "reply": reply, 
      "current_step": session.current_step 
    }

  async def get_or_create_reflection_session(user_id: str, insight_id: str):
    session = await ReflectionSession.find_one(
      ReflectionSession.user_id == PydanticObjectId(user_id),
      ReflectionSession.insight_id == PydanticObjectId(insight_id),
      ReflectionSession.completed == False
    )

    if session:
      return session
    
    session = ReflectionSession(
      user_id=user_id,
      insight_id=insight_id,
      messages=[],
      summary="",
      completed=False
    )

    await session.insert()
    return session
  

  async def get_session(user_id: str, insight_id: str):
    session =await ReflectionSession.find_one(
      ReflectionSession.user_id == PydanticObjectId(user_id),
      ReflectionSession.insight_id == PydanticObjectId(insight_id),
      ReflectionSession.completed == False
    )

    if not session: return { "exists": False } 

    return {
      "exists": True,
      "messages": session.messages,
      "step": session.current_step
    }
  

  async def get_summary(user_id: str, insight_id: str):
    session = await ReflectionSession.find_one(
      ReflectionSession.user_id == user_id,
      ReflectionSession.insight_id == insight_id,
      ReflectionSession.completed == True
    )

    if not session:
      return {"summary": None}
    
    return {"summary": session.summary}
  

  async def update_step(user_id: str, insight_id: str, step: int):
    session = await ReflectionService.get_or_create_reflection_session(user_id, insight_id)
    session.current_step = step
    await session.save()


  async def complete_reflection(user_id: str, insight_id: str):
    session = await ReflectionService.get_or_create_reflection_session(user_id, insight_id)

    if not session:
      raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    
    session.summary = await AIService.generate_reflection_summary(session.messages)
    session.completed = True

    await session.save()

    return { "summary": session.summary }