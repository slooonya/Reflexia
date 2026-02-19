from fastapi import Cookie, HTTPException, status
from app.core.security import verify_access_token
from app.models.user import User


async def get_current_user(access_token: str = Cookie(None)):
  if not access_token:
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")

  payload =  verify_access_token(access_token)

  if payload is None:
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")
  
  user_id = payload.get("sub")
  user = await User.get(user_id)

  if not user:
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
  
  return user