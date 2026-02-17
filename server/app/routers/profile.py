from fastapi import APIRouter, HTTPException

from app.schemas.profile import ProfileResponse, ProfileUpdateRequest
from app.models.user import User
from app.services.users import get_dev_user


router = APIRouter(prefix="/api/profile", tags=["profile"])

@router.patch("/")
async def update_profile(body: ProfileUpdateRequest):
  # TODO: change this to real user
  user = await get_dev_user()  

  if body.username:
    exists = await User.find_one(
      User.username == body.username,
      User.id != user.id
    )

    if exists:
      raise HTTPException(
        status_code=409,
        detail={
          "field": "username",
          "message": "Username already taken"
        }
      )
    
    user.username = body.username

  if body.email:
    exists = await User.find_one(
      User.email == body.email,
      User.id != user.id
    )

    if exists:
      raise HTTPException(
        status_code=409,
        detail={
          "field": "email",
          "message": "Email already registered"
        }
      )
    
    user.email = body.email

  if body.password:
    if body.password == user.password:
      raise HTTPException(
        status_code=400,
        detail={
          "field": "password",
          "message": "New password must be different"
        }
      )
    
    # TODO: need to hash the password
    user.password = body.password

  await user.save()

  return {"status": "ok"}
      
    
@router.get("/", response_model=ProfileResponse)
async def get_profile():
  # TODO: change this to real user
  user = await get_dev_user()

  return ProfileResponse(
    id=str(user.id),
    username=user.username,
    email=user.email
  )