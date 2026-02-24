from fastapi import APIRouter, File, UploadFile, Depends

from app.schemas.profile import ProfileResponse, ProfileUpdateRequest
from app.models.user import User
from app.core.dependencies import get_current_user
from app.services.profile_service import ProfileService


router = APIRouter(prefix="/api/profile", tags=["profile"])

@router.patch("/")
async def update_profile(body: ProfileUpdateRequest, user: User = Depends(get_current_user)): 
  updated_user = await ProfileService.update_profile(user, body)

  return ProfileResponse(
    id=str(updated_user.id),
    username=updated_user.username,
    email=updated_user.email,
    pfp_url=updated_user.pfp_url
  )


@router.patch("/pfp")
async def upload_pfp(file: UploadFile = File(...), user: User = Depends(get_current_user)):
  url = await ProfileService.upload_pfp(user, file)

  return {"pfp_url": url}


@router.delete("/pfp")
async def remove_pfp(user: User = Depends(get_current_user)):
  await ProfileService.remove_pfp(user)
  return {"ok": True}

    
@router.get("/", response_model=ProfileResponse)
async def get_profile(user: User = Depends(get_current_user)):
  return ProfileResponse(
    id=str(user.id),
    username=user.username,
    email=user.email,
    pfp_url=user.pfp_url
  )