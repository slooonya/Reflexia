import bcrypt
import jwt
from datetime import datetime, timedelta, timezone
from app.core.config import settings


def hash_password(password):
    pwd_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password=pwd_bytes, salt=salt)
    return hashed_password.decode('utf-8')


def verify_password(plain_password, hashed_password):
    return bcrypt.checkpw(plain_password.encode('utf-8'),hashed_password.encode('utf-8'))


def create_access_token(data: dict):
  to_encode = data.copy()
  expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
  to_encode.update({ "exp": expire, "type": "access" })
  encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
  return encoded_jwt


def verify_access_token(token: str):
  try:
    payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])

    if payload.get("type") != "access":
       return None
    
    return payload
  
  except jwt.ExpiredSignatureError:
    return None
  except jwt.PyJWTError:
    return None
  

def create_refresh_token(data: dict):
   to_encode = data.copy()
   expire = datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
   to_encode.update({ "exp": expire, "type": "refresh" })
   return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)