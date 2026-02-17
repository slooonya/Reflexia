from openai import OpenAI
from app.core.config import settings
import json
import base64
import uuid

from app.utils.randomizer import pick_step_prompt
from app.core.paths import IMAGES_DIR

client = OpenAI(api_key=settings.OPENAI_API_KEY)

DEBUG_AI = True

# TODO: compose a better prompt
def generate_weekly_summary(metadata: list[dict]) -> str:
  if DEBUG_AI:
    return f"Test weekly summary ({len(metadata)} videos)"

  prompt = f"""
  Analyze this YouTube watch history metadata.

  Write a reflective viewing summary.

  Include:
  - Dominant content themes
  - Repeated topics or formats
  - Style of content (educational, entertainment, commentary, etc.)
  - Emotional tone
  - Variety vs repetition

  Rules:
  - Do NOT judge or give advice
  - Be neutral

  Format:
  - 2 short paragraphs
  - Use **bold highlights** for main themes 

  Metadata:
  {json.dumps(metadata, ensure_ascii=False)}
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
  Create an image prompt that visually represents the user's media consumption patterns.

  Include:
  - Objects symbolizing content themes
  - Mood lighting
  - Environment
  - Color palette reflecting emotional tone
  - Visual metaphors where appropriate

  Rules:
  - No text overlays
  - Do not infer a user's appearance

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
  Write a reflective summary based on the weekly YouTube watch history summaries.

  Include:
  - Recurring themes across weeks
  - Shifts in interests or tone
  - Consistency vs exploration
  - Emotional patterns across time

  Rules:
  - Neutral and supportive
  - No judgment
  - No advice

  Format:
  - 2-3 short paragraphs
  - Use **bold highlights** for main themes 
  - Smooth narrative flow

  Weekly summaries:
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
  Create an image prompt that visually represents a month of user's media consumption.

  Include:
  - Symbolic elements for dominant themes
  - Mood lighting
  - Sense of time or progression
  - Color palette tied to emotional tone

  Rules:
  - INo text overlays
  - Avoid inferring a user's appearance

  Weekly summaries:
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
  images_path = IMAGES_DIR / filename
  images_path.parent.mkdir(parents=True, exist_ok=True)

  image_bytes = base64.b64decode(image_data[0])
  images_path.write_bytes(image_bytes)

  return f"/images/{filename}"


async def refine_image_prompt(base_prompt, fixes):
  response = await client.responses.create(
    model="gpt-5-mini",
    input=[
      {
        "role": "system",
        "content": "You refine image generation prompts while preserving symbolism and theme."
      },
      {
        "role": "user",
        "content": f"""
        Base image prompt:
        {base_prompt}

        User requested changes:
        {fixes}
        """
      }
    ]
  )

  return response.output_text.strip()


ASSISTANT_PROMPT = """
You are a guided reflection assistant helping users examine their media consumption using the Gibbs reflective cycle.

Style:
- Warm, calm, non-judgmental
- Supportive but not therapeutic
- Curious, not leading

Rules:
- Ask AT MOST ONE question per reply
- No advice
- Do not analyze for user
- If the user shares something meaningful, reflect it back briefly

Format:
- Short paragraphs
- Optional bullet points
- Use **bold highlights**
- Max 90 words
"""

async def generate_chat_reply(messages, step):

  step_prompt = pick_step_prompt(step)

  response = client.chat.completions.create(
    model="gpt-5-mini",
    messages=[
      {"role": "system", "content": ASSISTANT_PROMPT + 
       "\n\nCurrent reflection stage guidance:\n" +
       step_prompt},
      *messages
    ]
  )

  return response.choices[0].message.content


async def generate_reflection_summary(messages):
  prompt = """
  Summarize this media reflection session.

  Include:
  - Main viewing patterns noticed
  - Emotional responses mentioned
  - Any insights or planned adjustments

  Rules:
  - Supportive and neutral
  - No judgment/advice

  Format:
  - 140-180 words
  - Structured paragraphs
  - Use **bold highlights** for key insights
  """

  response = client.chat.completions.create(
    model="gpt-5-mini",
    messages=[
      {"role": "system", "content": prompt},
      *messages
    ]
  )

  return response.choices[0].message.content