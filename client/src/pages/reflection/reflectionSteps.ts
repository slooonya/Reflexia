export const REFLECTION_STEPS = ["Description", "Feelings", "Evaluation", "Analysis", "Conclusion", "Action Plan"];


// TODO: Generate better and more tips and prompts
export const PROMPTS: string[][] = [

  // STEP 1 — DESCRIPTION
  [
    "Looking back at what you watched recently, what kinds of videos or topics stand out to you?",

    "How would you describe the general energy of your recent session—was it educational, chaotic, or perhaps just a distraction?",

    "What do you remember most about the content you spent time with recently?",

    "How would you describe your viewing session in a few words?",

    "What was the 'vibe' of the creators you spent the most time with (e.g., calm and grounded or loud and high-intensity)?"
  ],

  // STEP 2 — FEELINGS
  [
    "What was your dominant mood right before you started watching, and how did it shift by the end?",

    "During your viewing, did you notice any moments where you felt a sudden spike in anxiety, envy, or relief?",

    "Did your mood change at all while you were watching videos?",

    "If you had to describe the emotional tone of the content you consumed, what would it be?",

    "As you think about your recent viewing, how did it leave you feeling overall?"
  ],

  // STEP 3 — EVALUATION
  [
    "Which part of your recent viewing felt like it actually added value to your day?",

    "Did the time you spent watching videos feel aligned with what you wanted from your viewing?",

    "What do you think was beneficial/negative about the videos you watched?",

    "If you had to give that block of content you watched a score out of 10, what would it be and why?",

    "Was there a moment where you felt like you were getting what you needed, or a moment where you felt like you were wasting time?"
  ],

  // STEP 4 — ANALYSIS
  [
    "Why do you think those particular videos caught your attention?",
    
    "What might have influenced the direction your viewing took?",

    "Do you notice any connection between what you watched and what was on your mind?",

    "Why do you think you ended up watching that particular content at that moment?",
  ],

  // STEP 5 — CONCLUSION
  [
    "What have you noticed about your media habits from this experience?",

    "After reflecting on this, what's one thing you've learned about your current media habits?",

    "What did this session reveal about what you actually need right now (e.g., real connection, rest, or focus)?",

    "What's a key insight you're taking away from how this session went?",

    "Is there anything new you've realized while thinking about your viewing?",

    "If you had to summarize what this experience taught you about your media consumption habits, what would you say?"
  ],

  // STEP 6 — ACTION
  [
    "What is one small boundary you can set for your next session to make sure it supports your mental health?",

    "Thinking ahead, is there anything you'd like to do differently next time you watch videos on YouTube?",

    "What would a 'win' look like for your next media session? How will you know it went better?",

    "What's a simple 'if-then' plan you can set? For example: 'If I notice I'm doomscrolling, then I will...'",
  ]
];


export const TIPS = [
  // STEP 1 — DESCRIPTION
  [
    { title: "Be Specific", text: "Name the genres and the specific topics covered in the videos." },
    { title: "Include Context", text: "Mention when and where you were watching." },
    { title: "Identify the Hook", text: "Mention what drew you in—was it the thumbnail, the title, or an algorithmic recommendation?" },
    { title: "Notice Format", text: "Short clips, long videos, music, podcasts — note differences." }
  ],

  // STEP 2 — FEELINGS
  [
    { title: "Initial Reaction", text: "Describe your mood before, during, and after watching. Did it change?" },
    { title: "Scan Your Body", text: "Mention if you felt relaxed, tense, restless, or if you felt a 'numb' sensation from scrolling." },
    { title: "No Right Reaction", text: "Any emotional response is valid." },
    { title: "Honesty Policy", text: "It's okay to admit if you felt bored, annoyed, or even manipulated by the content." }
  ],

  // STEP 3 — EVALUATION
  [
    { title: "Notice Energy", text: "Did this content energize or drain you?" },
    { title: "Spot Value", text: "Which videos felt meaningful or memorable?" },
    { title: "Check the Intent", text: "Decide if the video served its purpose, whether that was genuine rest, learning, or just killing time." }
  ],

  // STEP 4 — ANALYSIS
  [
    { title: "Check Triggers", text: "Recommendations, habits, or boredom can influence choice." },
    { title: "Connect to Reality", text: "Relate your reaction to what is currently happening in your 'offline' life." },
    { title: "Time Matters", text: "Late night vs daytime often changes picks." },
    { title: "Pattern Recognition", text: "Is this a type of content you find yourself stuck in often? Why does it have a hold on you?" }
  ],

  // STEP 5 — CONCLUSION
  [
    { title: "The Core Lesson", text: "Try to sum up what this session taught you about your current needs or habits." },
    { title: "Look Forward", text: "Based on what you learned, what feels more clear about what you want next time?" },
    { title: "Summarize the Impact", text: "Consider whether this content aligns with your mental health needs." }
  ],

  // STEP 6 — ACTION
  [
    { title: "Think Adjustments", text: "Small tweaks are enough." },
    { title: "Curate Your Feed", text: "Decide if you need to 'tell' the algorithm to show you less of this, or more of something else." },
    { title: "Prepare a Trigger", text: "Decide on a signal (e.g., a timer, a sticky note) that will remind you to pause and check in." },
  ]
];


export const PLACEHOLDERS = ["This week, I noticed that...", "When I think about it, I felt…", 
                      "Something that felt positive was…", "I think this happened because…", 
                      "One thing I'm taking away is…", "A small step I can take is…"];