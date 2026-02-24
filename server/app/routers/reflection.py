from fastapi import APIRouter, Depends

from app.services.reflection_service import ReflectionService
from app.models.user import User
from app.schemas.reflection import ReflectionChatRequest, ReflectionStepUpdateRequest
from app.core.dependencies import get_current_user


router = APIRouter(prefix="/api/reflection", tags=["reflection"])

@router.post("/chat")
async def handle_reflection_chat(request: ReflectionChatRequest, user: User = Depends(get_current_user)):
  return await ReflectionService.handle_chat(str(user.id), request.insight_id, request.step, request.message)


@router.post("/complete/{insight_id}")
async def complete_reflection(insight_id: str, user: User = Depends(get_current_user)):
  return await ReflectionService.complete_reflection(str(user.id), insight_id)
  

@router.get("/session/{insight_id}")
async def get_reflection_session(insight_id: str, user: User = Depends(get_current_user)):
  return await ReflectionService.get_session(str(user.id), insight_id)


@router.get("/summary/{insight_id}")
async def get_reflection_summary(insight_id: str, user: User = Depends(get_current_user)):
  return await ReflectionService.get_summary(str(user.id), insight_id)


@router.post("/step")
async def update_reflection_step(request: ReflectionStepUpdateRequest, user: User = Depends(get_current_user)):
  return await ReflectionService.update_step(str(user.id), request.insight_id, request.step)