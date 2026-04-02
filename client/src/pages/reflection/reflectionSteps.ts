export const REFLECTION_STEPS = ["Description", "Feelings", "Evaluation", "Analysis", "Conclusion", "Action Plan"];


// TODO: Generate better and more tips and prompts
export const PROMPTS: string[][] = [

  // STEP 1 — DESCRIPTION
  [
    "Looking back at your recent YouTube sessions, what did you watch and what was the context around it?"
  ],

  // STEP 2 — FEELINGS
  [
    "How did you feel before, during, and after the viewing sessions this week?"
  ],

  // STEP 3 — EVALUATION
  [
    "If you had to give that block of content you watched a score out of 10, what would it be and why?",
  ],

  // STEP 4 — ANALYSIS
  [
    "Why do you think you were drawn to this content at that time?"
  ],

  // STEP 5 — CONCLUSION
  [
    "What's something new you've realized about your media consumption habits or current needs while thinking about your viewing?"
  ],

  // STEP 6 — ACTION
  [
    "Thinking ahead, is there anything you'd like to do differently next time you watch videos on YouTube?",

    "What would a 'win' look like for your next YouTube session? How will you know it went better?"
  ]
];


export const TIPS = [
  // STEP 1 — DESCRIPTION
  [
    { title: "Be Specific", text: "Name the main topics, genres, format, or creators you watched." },
    { title: "Include Context", text: "Mention when and where you were watching (e.g., late night, during a meal)" },
    { title: "Identify the Hook", text: "Recall what videos or recommendations started the session. Notice what made you click (e.g., thumbnail, algorithmic recommendation)."}
  ],

  // STEP 2 — FEELINGS
  [
    { title: "Mood Shift", text: "Compare your mood before, during, and after watching." },
    { title: "Body Signals", text: "Mention how you felt physically while watching (e.g., relaxed, tense, restless)?" },
    { title: "Emotional Tone", text: "Did the content make you feel calm, anxious, inspired, etc.?" }
  ],

  // STEP 3 — EVALUATION
  [
    { title: "Helpful Moments", text: "Note something that genuinely improved your mood, was meaningful or valuable." },
    { title: "Draining Moments", text: "Mention content that left you feeling worse, felt like a filler or a waste of time." },
    { title: "Intent vs Reality", text: "Consider if your viewing session matched what you hoped to get from it (e.g., rest, learning, distraction)." }
  ],

  // STEP 4 — ANALYSIS
  [
    { title: "Underlying Needs", text: "Think about what you needed at that moment (e.g., comfort, connection, motivation)." },
    { title: "Connect to Reality", text: "Relate your content choices to what is currently happening in your 'offline' life." },
    { title: "Pattern Recognition", text: "Notice if this type of content keeps showing up and why it might have a hold on you." }
  ],

  // STEP 5 — CONCLUSION
  [
    { title: "Key Insight", text: "Try to sum up what this session taught you about your current needs, media habits, or content choices." },
    { title: "Look Forward", text: "Is there something you'd like to watch more of—or less of?" },
    { title: "Summarize the Impact", text: "Consider whether the content you watched aligns with your mental health needs." }
  ],

  // STEP 6 — ACTION
  [
    { title: "Small Step", text: "Think of one realistic adjustment, not a big rule." },
    { title: "Change of Context", text: "Could a different time, place, or device change how the session feels?" },
    { title: "Reflection Reminders", text: "What could serve as a simple reminder (e.g., a timer, a sticky note) to pause and check in?" },
  ]
];


export const PLACEHOLDERS = ["This week, I noticed that...", "When I think about it, I felt…", 
                      "Something that felt positive was…", "I think this happened because…", 
                      "One thing I'm taking away is…", "A small step I can take is…"];