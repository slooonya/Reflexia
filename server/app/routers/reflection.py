from fastapi import APIRouter, HTTPException

from app.services.ai_service import generate_chat_reply
from app.services.reflection_service import  get_or_create_reflection_session
from app.services.ai_service import generate_reflection_summary
from app.models.reflection import ReflectionSession
from app.schemas.reflection import ReflectionChatRequest, ReflectionStepUpdateRequest
from app.services.users import get_dev_user


router = APIRouter(prefix="/api/reflection", tags=["reflection"])

@router.post("/chat")
async def handle_reflection_chat(request: ReflectionChatRequest):

  user = await get_dev_user()

  session = await get_or_create_reflection_session(str(user.id), request.insight_id)

  session.current_step = request.step

  session.messages.append({
    "role": "user",
    "content": request.message,
    "step": request.step
  })

  reply = await generate_chat_reply(session.messages, request.step)

  session.messages.append({
    "role": "system",
    "content": reply,
    "step": request.step
  })

  await session.save()

  return { "reply": reply, "current_step": session.current_step }


@router.post("/complete/{insight_id}")
async def complete_reflection(insight_id: str):

  user = await get_dev_user()

  session = await get_or_create_reflection_session(str(user.id), insight_id)

  if not session:
    raise HTTPException(404)
  
  session.summary = await generate_reflection_summary(session.messages)
  session.completed = True

  await session.save()

  return { "summary": session.summary }


@router.get("/session/{insight_id}")
async def get_reflection_session(insight_id: str):
  user = await get_dev_user()

  session = await get_or_create_reflection_session(str(user.id), insight_id)

  if not session:
    return { "exists": False }
  
  return {
    "exists": True,
    "messages": session.messages,
    "step": session.current_step
  }


@router.get("/summary/{insight_id}")
async def get_reflection_summary(insight_id: str):
  user = await get_dev_user()

  session = await ReflectionSession.find_one(
    ReflectionSession.user_id == str(user.id),
    ReflectionSession.insight_id == insight_id,
    ReflectionSession.completed == True
  )

  if not session:
    return {"summary": None}
  
  return {"summary": session.summary}


@router.post("/step")
async def update_reflection_step(request: ReflectionStepUpdateRequest):
  user = await get_dev_user()

  session = await get_or_create_reflection_session(str(user.id), request.insight_id)
  
  session.current_step = request.step
  await session.save()

  return {"ok": True}