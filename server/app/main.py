from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from pymongo import AsyncMongoClient

from app.core.config import settings

import logging


logger = logging.getLogger("uvicorn")

@asynccontextmanager
async def lifespan(app: FastAPI):
  app.mongodb_client = AsyncMongoClient(settings.MONGODB_URL)
  app.database = app.mongodb_client[settings.MONGODB_NAME]

  ping = await app.database.command("ping")
  if int(ping["ok"]) != 1:
      raise Exception("Mongo connection failed")
  else:
      logger.info("Connected to MongoDB")

  yield

  await app.mongodb_client.close()
  logger.info("Mongo connection closed")


app = FastAPI(title=settings.APP_NAME, lifespan=lifespan)

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)
