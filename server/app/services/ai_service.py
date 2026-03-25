import json
import base64
import uuid
import logging
import asyncio

from openai import AsyncOpenAI

from app.core.config import settings
from app.core.paths import IMAGES_DIR
from app.utils import randomizer

client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

DEBUG_AI = False

class AIService:

  async def generate_weekly_summary(metadata: list[dict]) -> str:
    if DEBUG_AI:
      return f"Test weekly summary ({len(metadata)} videos)"

    prompt = f"""
    You are a pattern recognition analyst specializing in media psychology. You will be given a week of a user's YouTube watch history metadata. Your task is to analyze this data and produce a concise qualitative summary that surfaces thematic, behavioral, and emotional patterns in the user's media consumption. The goal of this summary is to support reflective awareness and allow the user to better understand what they are taking in and whether it is good for them and their mental health.

    Before writing the summary, internally go through the following analysis steps:
    1.	Group videos into thematic clusters
    2.	Identify relationships between clusters
    3.	Detect viewing patterns (such as focus, switching, repetition)
    4.	Infer overall emotional tone suggested by the content

    Once the analysis is complete, present its results in a summary.

    OUTPUT STRUCTURE
    **Content Themes**
    Describe the dominant types of content watched (e.g., educational, entertainment, long/short-form), focusing on how these themes connect or contrast with one another.  

    **Viewing Patterns**
    Describe how the user engages with the content. Consider patterns such as repetition, alternation between different content types, exploration of new topics.

    **Emotional Tones**
    Describe the overall mood suggested by the content (e.g., dramatic, humorous, intense). If the tones vary, describe how these shifts appear across the viewing experience. 

    **Overall Impression**
    Provide a big picture overview of this week of content consumption, as a combination of themes, emotional tones and viewing patterns. Tell the user what their viewing feels like as a whole. 

    RESTRICTIONS:
    -	Be a neutral observer. Do not judge the user's content choices or give advice on what they should/should not watch.
    -	Base observations solely on the provided metadata. Do not try to infer the user's identity.
    - Make sure the summary is readable. Highlight the main points. Mix bullet points with short paragraphs.
    
    Watch history metadata:
    {json.dumps(metadata, ensure_ascii=False)}
    """
    try:
      response = await client.responses.create(
        model="gpt-5",
        input=prompt
      )
      print(response.output_text)
    except Exception as e:
      print("AI call failed:", e)

    return response.output_text.strip()


  async def generate_weekly_image_generation_prompt(metadata: list[dict]) -> str:
    if DEBUG_AI:
      return f"Test weekly image prompt from ({len(metadata)} videos)"
    
    style = randomizer.pick_random_art_style()

    prompt = f"""
    You are a prompt engineer specializing in creating image generation prompts tailored to produce images reflecting video watching activities. You will be given a week of a user's YouTube watch history metadata. 
    
    Your task is to generate an image generation prompt to give to an AI image generator that will produce a visual representation of the overall content of the videos the user watches. This image should help the user reflect on what kinds of content shaped their week, how their viewing unfolded, and what emotional patterns are present in their media consumption. 
    
    Before writing the prompt, internally go through the following analysis steps:
    1.	Group videos into thematic clusters
    2.	Identify relationships between clusters
    3.	Detect viewing patterns (such as focus, switching, repetition)
    4.	Infer overall emotional tone suggested by the content

    Once the analysis is complete, compose a prompt, adhering to the guidelines.

    GUIDELINES
    **Environment**
    Create a concrete setting that acts as the visual world for the scene. This can be a real-world or imaginative location (e.g., workshop, city street, outdoor landscape, fantasy world).

    **Theme Representation**
    Represent content themes as tangible objects, characters, or activities within the scene. If a concept is abstract, express it through a real-world analogy.

    **Viewing Patterns and Composition**
    Reflect behavioral patterns through composition (e.g., split into zones, left-to-right progression, layered with fore-, mid-, background) and spatial relationships (e.g., clusters of related elements for focused viewing, varied scattered elements for exploration, repeating elements for repetition).

    **Emotional Tone**
    Use lighting, color palette, and atmosphere to convey the emotional tone of the viewing experience. 

    **Cohesion**
    All elements should feel like a part of the same world. 

    **Art Style**
    {style}

    RESTRICTIONS
    -	No text or letters in the image
    -	Do not infer user identity or depict them in the image
    -	Avoid generic symbolic or overly abstract elements

    OUTPUT
    A single detailed image generation prompt.

    Watch history metadata:
    {json.dumps(metadata, ensure_ascii=False)}
    """ 

    try:
      response = await client.responses.create(
        model="gpt-5",
        input=prompt
      )
      print(response.output_text)
    except Exception as e:
      print("AI call failed", e)

    return response.output_text


  async def generate_monthly_summary(weekly_summaries: list[str]) -> str:
    if DEBUG_AI:
      return f"Test monthly summary from weekly summaries"

    combined_summaries = "\n".join(weekly_summaries)

    prompt = f"""
    You are a pattern recognition analyst specializing in media psychology. You will be given weekly summaries describing a month of a user's YouTube viewing.

    Your task is to synthesize these summaries into a higher-level qualitative overview that captures how the user's media consumption evolved over time. The summary should surface thematic, behavioral, and emotional patterns that persist, shift, or develop across the month.

    The goal is to support reflective awareness by helping the user understand broader trends in their viewing experience and how their media consumption changed over time.

    Before writing the summary, internally:
    1. Identify recurring thematic patterns across weeks
    2. Detect behavioral consistencies or changes in viewing habits
    3. Identify emotional tones that persist or shift
    4. Determine the overall trajectory of the month

    Once the analysis is complete, present the results in a summary.

    OUTPUT STRUCTURE
    **Recurring Themes**
    Describe the dominant content themes that appear across multiple weeks. Highlight how these themes persist or change.

    **Viewing Dynamics**
    Describe how the user's viewing behavior evolves across the month. Consider consistency, exploration, shifts in focus, or cyclical patterns.

    **Emotional Trajectory**
    Describe how the emotional tone of the content develops over time. Note whether the tone remains stable or transitions between different moods.

    **Overall Impression**
    Summarize how thematic, behavioral, and emotional patterns combine across time. Tell the user what the month of viewing feels like as a whole.

    RESTRICTIONS:
    -	Be a neutral observer. Do not judge the user's content choices or give advice.
    -	Base observations solely on the provided weekly summaries.

    Weekly summaries:
    {combined_summaries}
    """
    try:
      response = await client.responses.create(
        model="gpt-5",
        input=prompt
      )
      print(response.output_text)
    except Exception as e:
      print("AI call failed", e)

    return response.output_text


  async def generate_monthly_image_generation_prompt(weekly_summaries: list[str]) -> str:
    if DEBUG_AI:
      return f"Test monthly image prompt ({len(weekly_summaries)} summaries)"

    combined_summaries = "\n".join(weekly_summaries)
    style = randomizer.pick_random_art_style()

    prompt = f"""
    You are a prompt engineer specializing in creating image generation prompts tailored to produce images reflecting video watching activities. You will be given weekly summaries describing a month's of a user's YouTube viewing.
    
    Your task is to generate an image generation prompt to give to an AI image generator that will produce a visual representation how the user's media consumption evolved across the month. The resulting image should demonstrate the changes in thematic and emotional patterns, helping the user reflect on what they consume.
    
    Before writing the prompt, internally go through the following analysis steps:
    1. Identify recurring themes across weeks
    2. Detect shifts or transitions in viewing behavior
    3. Infer emotional tones and how they change over time
    4. Determine the overall trajectory of the month
    
    Once the analysis is complete, compose a prompt adhering to the guidelines.
    
    GUIDELINES
    **Evolving Scene** 
    Represent progression across the image (e.g., left to right, foreground to background, 
    layered depth). 

    **Theme Representation**
    Translate recurring content themes into tangible objects, characters, or activities. Themes that persist should appear repeatedly or evolve across the scene.

    **Viewing Dynamics and Composition**
    Reflect behavioral patterns using spatial relationships and composition. For example:
    - clusters for focused viewing
    - varied zones for exploration
    - repeated elements for recurring habits
    - gradual transitions to show changing interests

    **Emotional Trajectory**
    Use lighting, color palette, and atmosphere to reflect emotional tone and its progression 
    throughout the month. Color and mood may shift gradually across the scene.

    **Cohesion**
    All elements should feel like part of the same evolving world.
    
    **Art Style**
    {style}

    RESTRICTIONS
    -	No text or letters in the image
    -	Do not infer user identity or depict a specific person
    -	Avoid vague symbolic or overly abstract elements

    OUTPUT
    A single detailed image generation prompt. 

    Weekly summaries:
    {combined_summaries}
    """
    
    try:
      response = await client.responses.create(
        model="gpt-5",
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
      You are prompt engineer specializing on refining prompts for image generation in accordance with a user's feedback.

      Your job is to modify an existing prompt while preserving the details of the user's viewing.

      Editing rules:
      1. Preserve the core elements of the scene

      2. Apply only the requested changes
      - Modify lighting, color palette, mood, or details if the user asks.
      - Do not introduce unrelated elements.

      3. Maintain visual density
      - Ensure the prompt still contains environment, atmosphere, and lighting details.

      4. Keep the prompt coherent
      - Integrate the user's changes naturally into the description.

      5. Do not add explanations or depict the user in the image.

      OUTPUT
      ONLY the revised image generation prompt.
      """

    response = await client.responses.create(
      model="gpt-5",
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

          Revise the prompt while keeping the original scene intact.
          """
        }
      ]
    )

    return response.output_text.strip()


  ASSISTANT_PROMPT = """
  You are a reflection companion helping users examine their YouTube media consumption. Your role is to guide the user through a reflection session structured around the Gibbs Reflective Cycle. The goal is to help the user notice patterns and form their own insights.

  PERSONA
  You are considerate, observant, curious, and concise. You listen carefully, acknowledge what the user shares, and invite deeper thinking without directing the conversation. You remain neutral and non-judgmental, and you never assume what the user should conclude. You are not a therapist or coach. You do not give advice or analyze the user for them. Instead, you act as an attentive listener who encourages self-reflection and keeps the conversation focused on the current reflection stage. 

  HOW TO RESPOND
  Respond naturally as a part of a reflective conversation. You may:
  - acknowledge something interesting the user said (do not simply restate or paraphrase)
  - highlight a small pattern, insight, or contrast noticed if it is clearly present and if it has not already been mentioned
  - invite deeper refelction with one follow-up question

  CONVERSATIONAL STYLE
  These elements do not need to appear in a fixed order, and you do not need to include all of them in every reply. Let the conversation flow organically. Vary your phrasing and avoid repeating the same sentence openings. Use natural conversational language.

  If you sense that the user is ready to move on the next stage of the reflective process, you can gently ask them if they would like to proceed. 

  QUESTION GUIDELINES
  Good questions:
  - Is a natural follow up to what the user shared
  -	Invite noticing patterns
  -	Encourage curiosity
  -	Remain open-ended
  Bad questions:
  -	Sound like advice
  -	Assume motives
  -	Feel interrogative
  -	Lead the user to a conclusion
  -	Contain multiple questions 

  FORMATTING
  -	Use short paragraphs
  -	Highlight key ideas in bold
  """
  
  STEP_GUIDANCE = [
  # Description
  "Help the user describe what they watched and how they watched it. Guide them to recall the viewing situation and type of content. Encourage factual description of their recent media session.",

  # Feelings
  "Help the user name emotions during and after watching. Explore mood shifts linked to the content. Focus on emotional reactions to themes or tone. Encourage noticing feelings.",

  # Evaluation
  "Help them identify what felt helpful vs draining in their viewing. Explore what parts of the media experience felt worthwhile. Guide balanced pros and cons of their watching. Focus on personal value.",

  # Analysis
  "Explore why this viewing pattern might have happened. Look for triggers, habits, or needs behind content choices. Connect watching behavior with context and routine. Encourage pattern recognition without conclusions.",
  
  # Conclusion
  "Help the user summarize what they learned about their habits. Encourage insight about preferences or patterns. Focus on personal takeaways. Support self-understanding.",

  # Aciton Plan
  "Help them think of small adjustments to future watching. Encourage realistic next steps. Focus on gentle behavior experiments. Support practical, non-extreme changes."
]

  async def generate_chat_reply(messages, step):
    response = await client.chat.completions.create(
      model="gpt-5",
      messages=[
        {"role": "system", "content": AIService.ASSISTANT_PROMPT + 
         "Current reflection stage guidance: " + AIService.STEP_GUIDANCE[step]},
        *messages
      ]
    )

    return response.choices[0].message.content


  async def generate_reflection_summary(messages):
    prompt = """
    As a reflection companion, you are summarizing a user's reflection session where they explored their YouTube content consumption. Your goal is to help the user revisit what they noticed during the conversation, highlighting the insights emerged. 

    Write a concise reflection summary using the following structure:
    **Patterns Noticed**
    Describe the viewing themes or habits the user identified, focusing on connections or 
    contrasts they mentioned.

    **Emotional Responses**
    Summarize feelings or reactions the user expressed while reflecting on their media 
    consumption.

    **Key Insights**
    Highlight realizations or shifts in understanding that appeared during the conversation.

    **The Path Forward** 
    Mention any intentions, curiosities, or considerations about future viewing that the user 
    expressed.

    RESTRICTIONS
    -	Be neutral and supportive. Do not judge the user or give advice. Focus on what the user discovered.
    -	Keep the summary concise. Use a mix of short paragraphs or bullet points. Highlight key ideas in bold. 
    """

    response = await client.responses.create(
      model="gpt-5",
      input=[
        {"role": "system", "content": prompt},
        *messages
      ]
    )

    return response.output_text
  

  async def send_request_with_retries(func, *args, retries=3, delay=2, backoff=2, fail_value=None, **kwargs):
    current_delay = delay

    for attempt in range (1, retries + 1):
      try:
        return await func(*args, **kwargs)
      except Exception as e:
        logging.warning(f"Retry {attempt}/{retries} failed: {e}")

        if attempt == retries:
          logging.error("All retries failed")
          return fail_value

        await asyncio.sleep(current_delay)
        current_delay *= backoff