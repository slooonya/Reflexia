from openai import OpenAI
from app.core.config import settings
from pathlib import Path
import json
import base64
import uuid

client = OpenAI(api_key=settings.OPENAI_API_KEY)

DEBUG_AI = False

# TODO: compose a better prompt
def generate_weekly_summary(metadata: list[dict]) -> str:
  if DEBUG_AI:
    return f"Test weekly summary ({len(metadata)} videos)"

  prompt = f"""
  You are analyzing a user's YouTube watch history.

  This is the information on the recent videos the user watched:
  {json.dumps(metadata, ensure_ascii=False)}

  Write a short summary (1-2 paragraphs) describing the main themes, interests, and emotional tone.
  """
  try:
    response = client.responses.create(
      model="gpt-5-mini",
      input=prompt
    )
    print(response.output_text)
  except Exception as e:
    print("AI call failed:", e)

  return response.output_text.strip()


# TODO: compose a better prompt
def generate_weekly_image_generation_prompt(summary: str) -> str:
  if DEBUG_AI:
    return f"Test weekly image prompt from {summary}"

  prompt = f"""
  Create a single image prompt that visually represents the user's watch history.

  Summary of user's viewing:
  {summary}
  """ 

  try:
    response = client.responses.create(
      model="gpt-5-mini",
      input=prompt
    )
    print(response.output_text)
  except Exception as e:
    print("AI call failed", e)

  return response.output_text


# TODO: compose a better prompt
def generate_monthly_summary(weekly_summaries: list[str]) -> str:
  if DEBUG_AI:
    return f"Test monthly summary from weekly summaries"

  combined_summaries = "\n".join(weekly_summaries)

  prompt = f"""
  You are analyzing a user's YouTube watch history. Summarize (in 1-2 paragraphs) the month viewing based on the following weekly summaries:

  {combined_summaries}
  """
  try:
    response = client.responses.create(
      model="gpt-5-mini",
      input=prompt
    )
    print(response.output_text)
  except Exception as e:
    print("AI call failed", e)

  return response.output_text


# TODO: compose a better prompt
def generate_monthly_image_generation_prompt(weekly_summaries: list[str]) -> str:
  if DEBUG_AI:
    return f"Test monthly image prompt ({len(weekly_summaries)} summaries)"

  combined_summaries = "\n".join(weekly_summaries)

  prompt = f"""
  Produce a single image generation prompt based on these weekly summaries of user's watch history:

  {combined_summaries}
  """
  
  try:
    response = client.responses.create(
      model="gpt-5-mini",
      input=prompt
    )
    print(response.output_text)
  except Exception as e:
    print("AI call failed", e)

  return response.output_text


def generate_image(image_prompt: str) -> str:
  if DEBUG_AI:
    return "/images/test.png"

  try:
    response = client.responses.create(
      model="gpt-5",
      input=image_prompt,
      tools=[{"type": "image_generation"}],
    )
    print(response.output_text)
  except Exception as e:
    print("AI call failed", e)

  image_data = [
    output.result
    for output in response.output
    if output.type == "image_generation_call"
  ]

  if not image_data:
    raise RuntimeError("No image returned")

  filename = f"{uuid.uuid4()}.png"
  path = Path("images") / filename
  path.parent.mkdir(parents=True, exist_ok=True)

  image_bytes = base64.b64decode(image_data[0])
  path.write_bytes(image_bytes)

  return f"/images/{filename}"