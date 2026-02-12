from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.core.paths import IMAGES_DIR
from app.db.database import init_db

from app.routers.insights import router as insights_router
from app.routers.upload import router as upload_router
from app.routers.jobs import router as jobs_router

import logging


logger = logging.getLogger("uvicorn")

@asynccontextmanager
async def lifespan(app: FastAPI):
  app.mongo_client = await init_db(
      settings.DB_URL,
      settings.DB_NAME
  )
  
  logger.info("Connected to MongoDB")

  yield

  await app.mongo_client.close()
  logger.info("MongoDB connection closed")


app = FastAPI(title=settings.APP_NAME, lifespan=lifespan)

app.mount("/images", StaticFiles(directory=IMAGES_DIR), name="images")

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)

app.include_router(insights_router)
app.include_router(upload_router)
app.include_router(jobs_router)

@app.get("/")
async def root():
    return {"status": "ok"}


@app.get("/test-youtube")
async def test_youtube():
    import requests
    
    video_id = "dQw4w9WgXcQ"
    url = f"https://www.googleapis.com/youtube/v3/videos"
    params = {
        "part": "snippet",
        "id": video_id,
        "key": settings.YOUTUBE_API_KEY
    }
    
    r = requests.get(url, params=params)
    return r.json()

@app.get("/test-google") 
async def test(): 
  import requests 
  r = requests.get("https://www.google.com") 
  return {"status": r.status_code}