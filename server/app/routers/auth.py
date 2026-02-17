from fastapi import APIRouter, HTTPException

from app.schemas.auth import LoginRequest
from app.models.user import User


router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/login")
async def login(body: LoginRequest):
  user = await User.find_one(User.email == body.email)

  # TODO: unhashed for now. change later
  if not user or user.password != body.password:
    raise HTTPException(
      status_code=401,
      detail="Invalid credentials"
    )
  
  return {"user_id": str(user.id)}