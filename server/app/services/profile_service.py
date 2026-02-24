import uuid

from fastapi import HTTPException, status, UploadFile

from app.models.user import User
from app.core.security import hash_password, verify_password
from app.core.paths import UPLOAD_DIR


class ProfileService:

  async def update_profile(user: User, body):
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
    return user
  

  async def upload_pfp(user: User, file: UploadFile):
    if not file.content_type.startswith("image/"):
      raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="File must be an image")
    
    extension = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{extension}"
    path = UPLOAD_DIR / filename

    contents = await file.read()
    path.write_bytes(contents)

    user.pfp_url = f"/uploads/{filename}"
    await user.save()

    return user.pfp_url
  

  async def remove_pfp(user: User):
    user.pfp_url = None
    await user.save()