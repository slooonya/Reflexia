from beanie import init_beanie
from pymongo import AsyncMongoClient

from app.models.user import User
from app.models.insight import InsightEntry
from app.models.reflection import ReflectionSession


async def init_db(db_url: str, db_name: str):
  client = AsyncMongoClient(db_url)
  db = client[db_name]

  await init_beanie(
    database=db,
    document_models=[
      User,
      InsightEntry,
      ReflectionSession
    ],
  )

  return client