import random

ART_STYLES = [
  "pixel art",
  "anime",
  "pop art",
  "3d pixar style",
  "studio ghibli",
  "sci-fi",
  "concept art",
  "fantasy",
  "vintage",
  "avant-garde",
  "cartoon",
  "mosaic",
  "classical art",
  "expressionism",
  "cinematic",
  "oil painting",
  "watercolor",
  "surreal collage",
  "ink sketch",
  "retro poster",
  "art nouveau",
  "comic book",
  "street art",
  "chibi",
  "hyperrealism",
]

def pick_random_art_style():
  return random.choice(ART_STYLES)