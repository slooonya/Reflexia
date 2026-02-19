from fastapi import APIRouter, HTTPException, status, Depends, Request
import jwt

from app.schemas.auth import LoginRequest, RegisterRequest, Token
from app.models.user import User
from app.core.security import create_refresh_token, hash_password, verify_password, create_access_token
from app.dependencies.auth import get_current_user
from app.core.config import settings
from authlib.integrations.starlette_client import OAuth


router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/login", response_model=Token)
async def login(body: LoginRequest):
  user = await User.find_one(User.email == body.email)

  if not user or not verify_password(body.password, user.password):
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="Invalid credentials"
    )
  
  access_token = create_access_token(data={"sub": str(user.id)})
  refresh_token = create_refresh_token(data={"sub": str(user.id)})
  
  return {
    "access_token": access_token,
    "refresh_token": refresh_token,
    "token_type": "bearer"
  }


@router.get("/me")
async def get_me(user: User = Depends(get_current_user)):
  return {
    "id": str(user.id),
    "email": user.email
  }


@router.post("/register")
async def register(body: RegisterRequest):
  existing_user = await User.find_one(User.email == body.email)

  if existing_user:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
  
  hashed_password = hash_password(body.password)

  user = User(
    email=body.email,
    username=body.email.split("@")[0],
    password=hashed_password
  )

  await user.insert()

  access_token = create_access_token(data={"sub": str(user.id)})
  refresh_token = create_refresh_token(data={"sub": str(user.id)})

  return {
    "access_token": access_token,
    "refresh_token": refresh_token,
    "token_type": "bearer"
  }


@router.post("/refresh")
async def refresh_token(body: dict):
  refresh_token = body.get("refresh_token")

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

  return {
    "access_token": new_access_token,
    "token_type": "bearer"
  }