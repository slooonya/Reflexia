import jwt

from fastapi import HTTPException, status

from app.core.security import create_access_token, create_refresh_token, hash_password, verify_password
from app.services.auth.oauth_client import oauth
from app.core.config import settings
from app.models.user import User


class AuthService:

  async def login(email: str, password: str):
    user = await User.find_one(User.email == email)

    if not user or not verify_password(password, user.password):
      raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid username or password")
    
    if user.is_google_account:
      raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Please sign in with Google")
    
    return AuthService.generate_tokens(user)
  

  async def register(email: str, password: str):
    existing_user = await User.find_one(User.email == email)
    if existing_user:
      raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    
    user = User(email=email, username=email.split("@")[0], password=hash_password(password))

    await user.insert()

    return AuthService.generate_tokens(user)
  

  async def handle_google_callback(request):
    token = await oauth.google.authorize_access_token(request)

    user_info = token.get("userinfo")
    if not user_info:
      raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Failed to retrieve user info")
    
    email = user_info.get("email")
    if not email:
      raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email not available")
    
    user = await User.find_one(User.email == email)
    if not user:
      user = User(
        email=email, 
        username=email.split("@")[0],
        password=None,
        is_google_account=True
      )
      await user.insert()

    return AuthService.generate_tokens(user)
  
    
  def generate_tokens(user):
    access_token = create_access_token(data={"sub": str(user.id)})
    refresh_token = create_refresh_token(data={"sub": str(user.id)})

    return {
      "access_token": access_token,
      "refresh_token": refresh_token
    }
  

  async def refresh(refresh_token: str):
    if not refresh_token:
      raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing refresh token")
    
    try:
      payload = jwt.decode(refresh_token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])

      if payload.get("type") != "refresh":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token type")
      
    except jwt.ExpiredSignatureError:
      raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Refresh token expired")
    
    except jwt.PyJWTError:
      raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")
    
    user_id = payload.get("sub")
    
    new_access_token = create_access_token(data={"sub": user_id})

    return new_access_token