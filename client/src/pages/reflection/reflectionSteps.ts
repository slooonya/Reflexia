export const REFLECTION_STEPS = ["Description", "Feelings", "Evaluation", "Analysis", "Conclusion", "Action Plan"];


// TODO: Generate better and more tips and prompts

export const PROMPTS: string[][] = [

  // STEP 1 — DESCRIPTION
  [
    "What were you watching or listening to during this period?",
    "Which types of media content did you consume most here?",
    "What stands out about what you watched or played?",
    "What themes or formats appeared most often?"
  ],

  // STEP 2 — FEELINGS
  [
    "How did this content make you feel while consuming it?",
    "What emotions came up during or after watching?",
    "Did your mood shift while going through this media?",
    "What feeling tone best matches this viewing period?"
  ],

  // STEP 3 — EVALUATION
  [
    "Which parts of this media felt engaging or useful?",
    "Which parts felt draining or unhelpful?",
    "What content felt worth your time?",
    "What content felt like filler or autopilot watching?"
  ],

  // STEP 4 — ANALYSIS
  [
    "What influenced your choice to watch this kind of content?",
    "Were these picks intentional, habitual, or recommended?",
    "Did time of day or energy level affect your choices?",
    "Did autoplay or algorithms guide what came next?"
  ],

  // STEP 5 — CONCLUSION
  [
    "What pattern do you notice in your media choices here?",
    "What does this say about what you needed at the time?",
    "What theme connects most of this content?",
    "What insight stands out about your viewing behavior?"
  ],

  // STEP 6 — ACTION
  [
    "What would you keep the same next time?",
    "What would you change about your media choices?",
    "What boundary or habit might you try next?",
    "How might you choose content more intentionally?"
  ]
];


export const TIPS = [
  // STEP 1 — DESCRIPTION
  [
    { title: "Be Specific", text: "Name the content types, genres, or creators." },
    { title: "Include Context", text: "Mention when and where you were watching." },
    { title: "Notice Format", text: "Short clips, long videos, music, podcasts — note differences." }
  ],

  // STEP 2 — FEELINGS
  [
    { title: "Track Mood", text: "Notice feelings during and after watching." },
    { title: "Separate Content vs Mood", text: "Your mood and the media tone may differ." },
    { title: "No Right Reaction", text: "Any emotional response is valid." }
  ],

  // STEP 3 — EVALUATION
  [
    { title: "Notice Energy", text: "Did this content energize or drain you?" },
    { title: "Spot Value", text: "Which items felt meaningful or memorable?" },
    { title: "Autoplay Check", text: "Was this chosen or just continued?" }
  ],

  // STEP 4 — ANALYSIS
  [
    { title: "Check Triggers", text: "Recommendations, habits, or boredom can influence choice." },
    { title: "Time Matters", text: "Late night vs daytime often changes picks." },
    { title: "Pattern Lens", text: "Look for repeats in themes or formats." }
  ],

  // STEP 5 — CONCLUSION
  [
    { title: "Find Themes", text: "Notice repeated topics or moods." },
    { title: "User Need Lens", text: "What need might this content meet?" },
    { title: "Stay Neutral", text: "Describe patterns without judging them." }
  ],

  // STEP 6 — ACTION
  [
    { title: "Think Adjustments", text: "Small tweaks are enough." },
    { title: "Choice vs Default", text: "Consider choosing instead of auto-continuing." },
    { title: "Experiment", text: "Try one different media choice next time." }
  ]
];


export const PLACEHOLDERS = ["This week, I noticed that...", "When I think about it, I felt…", 
                      "Something that felt positive was…", "I think this happened because…", 
                      "One thing I'm taking away is…", "A small step I can take is…"];