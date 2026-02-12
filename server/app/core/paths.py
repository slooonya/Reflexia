from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent
IMAGES_DIR = BASE_DIR / "images"

IMAGES_DIR.mkdir(parents=True, exist_ok=True)