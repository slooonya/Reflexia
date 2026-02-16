import random


STEP_PROMPTS = [
  # DESCRIPTION
  [
    "Help the user describe what they watched and how they watched it.",
    "Guide them to recall the viewing situation and type of content.",
    "Focus on platform, time of day, and content themes.",
    "Encourage factual description of their recent media session."
  ],

  # FEELINGS
  [
    "Help the user name emotions during and after watching.",
    "Explore mood shifts linked to the content.",
    "Focus on emotional reactions to themes or tone.",
    "Encourage noticing feelings without judging them."
  ],

  # EVALUATION
  [
    "Help them identify what felt helpful vs draining in their viewing.",
    "Explore what parts of the media experience felt worthwhile.",
    "Guide balanced pros and cons of their watching.",
    "Focus on personal value, not moral judgment."
  ],

  # ANALYSIS
  [
    "Explore why this viewing pattern might have happened.",
    "Look for triggers, habits, or needs behind content choices.",
    "Connect watching behavior with context and routine.",
    "Encourage pattern recognition without conclusions."
  ],

  # CONCLUSION
  [
    "Help the user summarize what they learned about their habits.",
    "Encourage insight about preferences or patterns.",
    "Focus on personal takeaways.",
    "Support self-understanding."
  ],

  # ACTION PLAN
  [
    "Help them think of small adjustments to future watching.",
    "Encourage realistic next steps.",
    "Focus on gentle behavior experiments.",
    "Support practical, non-extreme changes."
  ],
]

def pick_step_prompt(step: int) -> str:
  return random.choice(STEP_PROMPTS[step])