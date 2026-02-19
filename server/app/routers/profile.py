import uuid
from fastapi import APIRouter, File, HTTPException, UploadFile, Depends, status

from app.schemas.profile import ProfileResponse, ProfileUpdateRequest
from app.models.user import User
from app.core.paths import UPLOAD_DIR
from app.dependencies.auth import get_current_user
from app.utils.password_util import hash_password, verify_password


router = APIRouter(prefix="/api/profile", tags=["profile"])

@router.patch("/")
async def update_profile(body: ProfileUpdateRequest, user: User = Depends(get_current_user)): 
  if body.username:
    exists = await User.find_one(
      User.username == body.username,
      User.id != user.id
    )

    if exists:
      raise HTTPException(
        status_code=status.HTTP_409_CONFLICT,
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
        status_code=status.HTTP_409_CONFLICT,
        detail={
          "field": "email",
          "message": "Email already registered"
        }
      )
    
    user.email = body.email

  if body.password:
    if verify_password(body.password, user.password):
      raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail={
          "field": "password",
          "message": "New password must be different"
        }
      )
    
    user.password = hash_password(body.password)

  await user.save()

  return {
    "id": str(user.id),
    "username": user.username,
    "email": user.email,
    "pfp_url": user.pfp_url
  }


@router.patch("/pfp")
async def upload_pfp(file: UploadFile = File(...), user: User = Depends(get_current_user)):
  if not file.content_type.startswith("image/"):
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="File must be an image")
  
  extension = file.filename.split(".")[-1]
  filename = f"{uuid.uuid4()}.{extension}"
  path = UPLOAD_DIR / filename

  contents = await file.read()

  path.write_bytes(contents)

  user.pfp_url = f"/uploads/{filename}"
  await user.save()

  return {"pfp_url": user.pfp_url}


@router.delete("/pfp")
async def remove_pfp(user: User = Depends(get_current_user)):
  user.pfp_url = None
  await user.save()

  return {"ok": True}

    
@router.get("/", response_model=ProfileResponse)
async def get_profile(user: User = Depends(get_current_user)):
  return ProfileResponse(
    id=str(user.id),
    username=user.username,
    email=user.email,
    pfp_url=user.pfp_url
  )