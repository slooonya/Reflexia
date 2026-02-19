from fastapi import APIRouter, HTTPException, status, Depends

from app.schemas.auth import LoginRequest, RegisterRequest
from app.models.user import User
from app.utils.token_util import generate_jwt_token
from app.utils.password_util import hash_password, verify_password
from app.dependencies.auth import get_current_user


router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/login")
async def login(body: LoginRequest):
  user = await User.find_one(User.email == body.email)

  if not user or not verify_password(body.password, user.password):
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="Invalid credentials"
    )
  
  token = generate_jwt_token(data={"sub": str(user.id)})
  
  return {
    "access_token": token,
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

  token = generate_jwt_token(data={"sub": str(user.id)})

  return {
    "access_token": token,
    "token_type": "bearer"
  }