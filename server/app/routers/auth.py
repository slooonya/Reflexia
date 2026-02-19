from fastapi import APIRouter, Cookie, HTTPException, status, Depends, Request
from fastapi.responses import JSONResponse, RedirectResponse
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

  if user.is_google_account:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Please sign in with Google")

  if not user or not verify_password(body.password, user.password):
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="Invalid credentials"
    )
  
  access_token = create_access_token(data={"sub": str(user.id)})
  refresh_token = create_refresh_token(data={"sub": str(user.id)})

  response = JSONResponse(content={"message": "Login successful"})

  response.set_cookie(
    key="access_token",
    value=access_token,
    httponly=True,
    secure=False, # TODO: change to True
    samesite="lax"
  )

  response.set_cookie(
    key="refresh_token",
    value=refresh_token,
    httponly=True,
    secure=False, # TODO: change to true
    samesite="lax"
  )
  
  return response


@router.post("/logout")
async def logout():
  response = JSONResponse(content={"message": "Logged Out"})

  response.delete_cookie("access_token")
  response.delete_cookie("refresh_token")

  return response


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

  response = JSONResponse(content={"message": "Registration successful"})

  response.set_cookie(
    key="access_token",
    value=access_token,
    httponly=True,
    secure=False, # TODO: change to True
    samesite="lax"
  )

  response.set_cookie(
    key="refresh_token",
    value=refresh_token,
    httponly=True,
    secure=False, # TODO: change to true
    samesite="lax"
  )
  
  return response


@router.post("/refresh")
async def refresh_token(refresh_token: str = Cookie(None)):
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

  response = JSONResponse(content={"message": "Token refreshed"})

  response.set_cookie(
    key="access_token",
    value=new_access_token,
    httponly=True,
    secure=False, # TODO: change to True
    samesite="lax"
  )

  return response


oauth = OAuth()
oauth.register(
  name="google",
  client_id=settings.GOOGLE_CLIENT_ID,
  client_secret=settings.GOOGLE_CLIENT_SECRET,
  client_kwargs={"scope": "openid email profile"},
  server_metadata_url="https://accounts.google.com/.well-known/openid-configuration"
)

@router.get("/google")
async def auth_google(request: Request):
  redirect_uri = f"{settings.BACKEND_URL}/api/auth/google/callback"
  return await oauth.google.authorize_redirect(request, redirect_uri)


@router.get("/google/callback")
async def google_callback(request: Request):
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

    access_token = create_access_token(data={"sub": str(user.id)})
    refresh_token = create_refresh_token(data={"sub": str(user.id)})

    response = RedirectResponse(url=f"{settings.FRONTEND_URL}/gallery")

    response.set_cookie(
      key="access_token",
      value=access_token,
      httponly=True,
      secure=False, # TODO: change to True later
      samesite="lax"
    )

    response.set_cookie(
      key="refresh_token",
      value=refresh_token,
      httponly=True,
      secure=False,
      samesite="lax" # TODO: change to True later
    )

    return response