from pydantic_settings import BaseSettings
from dotenv import load_dotenv


load_dotenv()

class Settings(BaseSettings):
  APP_NAME: str = "Reflexia"
  DB_URL: str
  DB_NAME: str
  OPENAI_API_KEY: str
  SECRET_KEY: str
  ACCESS_TOKEN_EXPIRE_MINUTES: int
  REFRESH_TOKEN_EXPIRE_DAYS: int
  ALGORITHM: str
  YOUTUBE_API_KEY: str

settings = Settings()