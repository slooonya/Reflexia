import json
import base64
import uuid

from openai import AsyncOpenAI

from app.core.config import settings
from app.core.paths import IMAGES_DIR
from app.utils.randomizer import pick_step_prompt

client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

DEBUG_AI = False

class AIService:

  # TODO: compose a better prompt
  async def generate_weekly_summary(metadata: list[dict]) -> str:
    if DEBUG_AI:
      return f"Test weekly summary ({len(metadata)} videos)"

    prompt = f"""
    You are analyzing a user's YouTube watch history to support **self-reflection**.

    Your goal is to describe patterns in a clear and structured way so the user can notice their own media habits.

    IMPORTANT:
    - Be neutral and observational
    - Do NOT judge the user
    - Do NOT give advice
    - DO NOT speculate about the user's identity
    - Base observations only on the provided metadata

    Write a **concise summary of viewing** using the following format:

    **Main Themes**
    - 3-5 dominant topics appearing in the viewing history
    - Highlight important themes in **bold**

    **Content Style**
    Describe the type of content watched. Examples: educational, commentary, entertainment, tutorials, news, short-form clips.

    **Viewing Patterns**
    Describe noticeable patterns such as:
    - Repetition of certain topics or creators
    - Balance between different types of content
    - Whether the viewing feels focused or varied

    **Emotional Tone**
    Describe the general mood suggested by the content (e.g., calm, dramatic, humorous, intense).

    **Overall Picture**
    Write 2-3 sentences summarizing what this week of viewing **feels like**.

    Keep the tone reflective and descriptive.

    Metadata:
    {json.dumps(metadata, ensure_ascii=False)}
    """
    try:
      response = await client.responses.create(
        model="gpt-5-mini",
        input=prompt
      )
      print(response.output_text)
    except Exception as e:
      print("AI call failed:", e)

    return response.output_text.strip()


  # TODO: compose a better prompt
  async def generate_weekly_image_generation_prompt(metadata: list[dict]) -> str:
    if DEBUG_AI:
      return f"Test weekly image prompt from ({len(metadata)} videos)"

    prompt = f"""
    You are creating a prompt for an image generation model.

    The goal is to visually represent a person's **YouTube viewing patterns for the week**.

    IMAGE PROMPT REQUIREMENTS

    1. Scene
    Describe a detailed environment that represents the viewing habits.

    2. Visual Metaphors
    Translate themes in the summary into symbolic objects or environments.

    3. Color Palette
    Choose colors that match the emotional tone of the content.

    4. Lighting & Atmosphere
    Describe lighting, depth, and mood to make the scene immersive.

    5. Composition
    Avoid generic abstract imagery. Instead create a **clear scene** that metaphorically reflects the viewing patterns.
    The image should feel **alive and visually engaging**.

    Rules:
    - No text or letters in the image
    - Do not infer a user's identity

    Write the output as a **single detailed image generation prompt**.

    Metadata:
    {json.dumps(metadata, ensure_ascii=False)}
    """ 

    try:
      response = await client.responses.create(
        model="gpt-5-mini",
        input=prompt
      )
      print(response.output_text)
    except Exception as e:
      print("AI call failed", e)

    return response.output_text


  # TODO: compose a better prompt
  async def generate_monthly_summary(weekly_summaries: list[str]) -> str:
    if DEBUG_AI:
      return f"Test monthly summary from weekly summaries"

    combined_summaries = "\n".join(weekly_summaries)

    prompt = f"""
    You are summarizing a month of a user's YouTube viewing patterns based on weekly summaries.

    Your goal is to help the user notice **larger patterns across time** in their media consumption.

    IMPORTANT:
    - Be neutral and observational
    - Do NOT judge the user
    - Do NOT give advice
    - Base observations only on the weekly summaries provided

    Write a clear structured summary using the following format:

    **Recurring Themes**
    Describe the topics or types of content that appeared repeatedly throughout the month.

    **Shifts Across the Month**
    Describe any noticeable changes in interests, tone, or content style between weeks.

    **Consistency vs Exploration**
    Describe whether the viewing pattern appears focused around a few topics or explores a wide variety of content.

    **Overall Picture**
    Write 2-3 sentences summarizing what the month of viewing feels like as a whole.

    GUIDELINES:
    - 130-170 words total
    - Short paragraphs (or brief bullet points if helpful)
    - Use **bold highlights** for important observations
    - Keep the tone reflective and descriptive
    - Focus on major patterns rather than individual videos

    Weekly summaries:
    {combined_summaries}
    """
    try:
      response = await client.responses.create(
        model="gpt-5-mini",
        input=prompt
      )
      print(response.output_text)
    except Exception as e:
      print("AI call failed", e)

    return response.output_text


  # TODO: compose a better prompt
  async def generate_monthly_image_generation_prompt(weekly_summaries: list[str]) -> str:
    if DEBUG_AI:
      return f"Test monthly image prompt ({len(weekly_summaries)} summaries)"

    combined_summaries = "\n".join(weekly_summaries)

    prompt = f"""
    You are creating a prompt for an image generation model.
    
    The image should represent a **month of YouTube viewing patterns**.

    The goal is to create a scene that feels symbolic and layered.

    Design the image around **ONE dominant visual metaphor** that represents how the user's media consumption evolved during the month.

    Possible metaphor styles include:
    - a landscape that changes from left to right
    - a growing tree with branches representing themes
    - constellations forming in a night sky

    IMAGE PROMPT REQUIREMENTS

    1. Central Metaphor
    Choose one strong visual metaphor and build the scene around it.

    2. Sense of Time
    Show progression across the image (for example left → right or foreground → background).

    3. Visual Elements
    Translate recurring themes into symbolic objects.

    4. Color Palette
    Use color transitions to reflect emotional tone or changes across the month.

    5. Lighting & Atmosphere
    Use lighting, depth, and atmosphere to make the scene immersive.

    Rules:
    - No text or letters
    - Do not infer the user's identity
    - Avoid minimalism or empty scenes

    Write a **single detailed image generation prompt**.

    Weekly summaries:
    {combined_summaries}
    """
    
    try:
      response = await client.responses.create(
        model="gpt-5-mini",
        input=prompt
      )
      print(response.output_text)
    except Exception as e:
      print("AI call failed", e)

    return response.output_text


  async def generate_image(image_prompt: str) -> str:
    if DEBUG_AI:
      return "/images/test.png"

    try:
      response = await client.responses.create(
        model="gpt-5",
        input=image_prompt,
        tools=[{"type": "image_generation"}],
      )
      print(response.output_text)
    except Exception as e:
      print("Error generating image", e)
      raise RuntimeError(f"Image generation failed: {e}")

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
    prompt ="""
      You refine prompts for image generation.

      Your job is to modify an existing prompt while preserving the details of the user's viewing.

      Editing rules:
      1. Preserve the core elements of the scene

      2. Apply only the requested changes
      - Modify lighting, color palette, mood, or details if the user asks.
      - Do not introduce unrelated elements.

      3. Maintain visual richness
      - Ensure the prompt still contains environment, atmosphere, and lighting details.

      4. Keep the prompt coherent
      - Integrate the user's changes naturally into the description.

      5. Do not add explanations.

      Output:
      Return only the revised image generation prompt.
      """

    response = await client.responses.create(
      model="gpt-5-mini",
      input=[
        {
          "role": "system",
          "content": prompt,
        },
        {
          "role": "user",
          "content": f"""
          Base image prompt:
          {base_prompt}

          User requested changes:
          {fixes}

          Revise the prompt while keeping the original scene and metaphor intact.
          """
        }
      ]
    )

    return response.output_text.strip()


  ASSISTANT_PROMPT = """
  You are a reflection facilitator helping users examine their YouTube media consumption.
  
  Your role is to guide the user through the **Gibbs Reflective Cycle**. The goal is to help the user notice patterns and form their own insights.

  You are NOT a coach, therapist, or advisor.

  CONVERSATION STYLE
  - Warm, calm, and curious
  - Neutral and non-judgmental
  - Speak like a thoughtful listener
  - Avoid sounding clinical or robotic
  - Keep responses concise and natural.

  HOW TO RESPOND
  Each reply should follow this structure:

  1. **Brief Reflection**
  Acknowledge or paraphrase something the user said.

  2. **Optional Observation**
  Point out a small pattern or contrast if it is clearly present.

  3. **One Open Question**
  Ask ONE question that encourages deeper reflection.

  QUESTION GUIDELINES
  Good questions:
  - invite noticing patterns
  - explore feelings or reactions
  - encourage curiosity
  - remain open-ended

  Avoid questions that:
  - sound like advice
  - assume motives
  - feel interrogative
  - lead the user toward a conclusion

  RULES
  - Ask **AT MOST one question**
  - Do NOT give advice
  - Do NOT analyze the user for them
  - Do NOT make assumptions about their identity
  - Do NOT lecture or provide long explanations

  FORMATTING
  - Short paragraphs
  - Natural conversational tone
  - Use **bold** occasionally to highlight key ideas
  - Maximum length: 90 words
  """

  async def generate_chat_reply(messages, step):

    step_prompt = pick_step_prompt(step)

    response = await client.chat.completions.create(
      model="gpt-5-mini",
      messages=[
        {"role": "system", "content": AIService.ASSISTANT_PROMPT + 
        "\n\nCurrent reflection stage guidance:\n" +
        step_prompt},
        *messages
      ]
    )

    return response.choices[0].message.content


  async def generate_reflection_summary(messages):
    prompt = """
    You are summarizing a user's reflection session about their YouTube viewing habits.

    Your goal is to create a **reflection summary** that helps the user revisit what they noticed during the conversation.

    IMPORTANT
    - Be neutral and supportive
    - Do NOT judge the user
    - Do NOT give advice
    - Base the summary only on what the user expressed

    Write the summary using the following structure:

    **Viewing Patterns Noticed**
    Briefly describe the main themes or habits the user observed in their viewing.

    **Emotional Reactions**
    Highlight any feelings or reactions the user mentioned while discussing their media consumption.

    **Insights the User Reached**
    Describe realizations or reflections that appeared during the conversation.

    **Possible Next Steps**
    Mention any future intentions the user expressed.

    GUIDELINES
    - 120-170 words total
    - Short paragraphs or bullet points
    - Use **bold highlights** for key ideas
    - Focus on what the user discovered
    """

    response = await client.chat.completions.create(
      model="gpt-5-mini",
      messages=[
        {"role": "system", "content": prompt},
        *messages
      ]
    )

    return response.choices[0].message.content