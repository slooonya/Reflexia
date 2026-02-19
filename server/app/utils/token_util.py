import jwt
from datetime import datetime, timedelta, timezone
from app.core.config import settings


def generate_jwt_token(data: dict):
  to_encode = data.copy()
  expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
  to_encode.update({ "exp": expire })
  encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
  return encoded_jwt


def verify_jwt_token(token: str):
  try:
    return jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
  except jwt.ExpiredSignatureError:
    return None
  except jwt.PyJWTError:
    return None