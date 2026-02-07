from pydantic_settings import BaseSettings
from dotenv import load_dotenv


load_dotenv()

class Settings(BaseSettings):
  APP_NAME: str = "Reflexia"
  MONGODB_URL: str
  MONGODB_NAME: str
  OPENAI_API_KEY: str
  SECRET_KEY: str

settings = Settings()