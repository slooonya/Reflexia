from fastapi import APIRouter, Cookie, Depends, Request
from fastapi.responses import JSONResponse, RedirectResponse

from app.schemas.auth import LoginRequest, RegisterRequest
from app.models.user import User
from app.services.auth.auth_service import AuthService
from app.services.auth.oauth_client import oauth
from app.core.config import settings
from app.core.dependencies import get_current_user


router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/login")
async def login(body: LoginRequest):
  tokens = await AuthService.login(body.email, body.password)

  response = JSONResponse(content={"message": "Login successful"})
  attach_auth_cookies(response, tokens)
  
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
  tokens = await AuthService.register(body.email, body.password)

  response = JSONResponse(content={"message": "Registration successful"})
  attach_auth_cookies(response, tokens)
  
  return response


@router.post("/refresh")
async def refresh_token(refresh_token: str = Cookie(None)):
  token = await AuthService.refresh(refresh_token)

  response = JSONResponse(content={"message": "Token refreshed"})

  response.set_cookie(
    key="access_token",
    value=token,
    httponly=True,
    secure=False, # TODO: change to True
    samesite="lax"
  )

  return response


@router.get("/google")
async def auth_google(request: Request):
  redirect_uri = f"{settings.BACKEND_URL}/api/auth/google/callback"
  return await oauth.google.authorize_redirect(request, redirect_uri)


@router.get("/google/callback")
async def google_callback(request: Request):     
  tokens = await AuthService.handle_google_callback(request)

  response = RedirectResponse(url=f"{settings.FRONTEND_URL}/gallery")
  attach_auth_cookies(response, tokens)

  return response


def attach_auth_cookies(response, tokens: dict):
  response.set_cookie(
    key="access_token",
    value=tokens["access_token"],
    httponly=True,
    secure=False,  # TODO: change to True later
    samesite="lax"
  )

  response.set_cookie(
    key="refresh_token",
    value=tokens["refresh_token"],
    httponly=True,
    secure=False, # TODO: change to True later
    samesite="lax"
  )