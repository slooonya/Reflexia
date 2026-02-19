from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.utils.token_util import verify_jwt_token
from app.models.user import User


security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
  token = credentials.credentials
  payload =  verify_jwt_token(token)

  if payload is None:
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")
  
  user_id = payload.get("sub")
  user = await User.get(user_id)

  if not user:
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, details="User not found")
  
  return user