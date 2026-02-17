export const REFLECTION_STEPS = ["Description", "Feelings", "Evaluation", "Analysis", "Conclusion", "Action Plan"];


// TODO: Generate better and more tips and prompts

export const PROMPTS: string[][] = [

  // STEP 1 — DESCRIPTION
  [
    "Looking back at what you watched recently, what were the recurring themes or topics that kept appearing?",

    "How would you describe the general energy of your recent session—was it educational, chaotic, or perhaps just a distraction?",

    "How did you move from one video to the next: were you following a specific curiosity or just letting the algorithm lead?",

    "Think about the environment where you were watching; what was happening around you during this session?",

    "What was the 'vibe' of the creators you spent the most time with today (e.g., calm and grounded or loud and high-intensity)?"
  ],

  // STEP 2 — FEELINGS
  [
    "What was your dominant mood right before you started watching, and how did it shift by the end?",

    "During your viewing, did you notice any moments where you felt a sudden spike in anxiety, envy, or relief?",

    "How did your body feel during this session—did you feel tense, slumped over, or genuinely relaxed?",

    "Were there any videos that left you feeling 'numb' or like you were just scrolling on autopilot?",

    "If you had to pick one emotion to summarize this entire viewing block, what would it be?"
  ],

  // STEP 3 — EVALUATION
  [
    "Which part of your recent viewing felt like it actually added value to your day?",

    "Was there a specific point where you felt the content stopped being helpful and started feeling draining?",

    "How did this block of time impact your mental clarity for the tasks you have to do next?",

    "Compared to other ways you could have spent this time, how 'nourishing' did this digital diet feel?",

    "Did the videos you watched align with the person you want to be, or did they feel like a departure from your values?"
  ],

  // STEP 4 — ANALYSIS
  [
    "Why do you think your brain was drawn to this specific mix of content today?",
    
    "If you were looking for an escape, what exactly were you trying to get away from in your 'offline' life?",

    "How does this recent history reflect what has been weighing on your mind lately?",

    "What do you think the algorithm was 'trying' to make you feel, and did you let it succeed?",

    "Why did you choose to stay in this specific 'rabbit hole' rather than clicking away earlier?"
  ],

  // STEP 5 — CONCLUSION
  [
    "What have you learned about how your recent digital habits are currently influencing your headspace?",

    "If you could go back and 'edit' this viewing session, which video would you have skipped entirely?",

    "What did this session reveal about what you actually need right now (e.g., real connection, rest, or focus)?",

    "How does this period of watching compare to your 'ideal' version of mindful media consumption?",

    "In hindsight, was there a specific 'turning point' where the session became more harmful than helpful?"
  ],

  // STEP 6 — ACTION
  [
    "What is one small boundary you can set for your next session to make sure it supports your mental health?",

    "How will you check in with your feelings before you hit play on the next 'recommended' video?",

    "Is there a specific topic or creator you want to 'mute' or avoid tomorrow to protect your peace?",

    "What is one 'real-world' activity you can do right now to ground yourself after all that screen time?",

    "If you find yourself in a similar 'autopilot' mode tomorrow, what will be your signal to put the phone down?"
  ]
];


export const TIPS = [
  // STEP 1 — DESCRIPTION
  [
    { title: "Be Specific", text: "Name the creators, the genres, and the specific topics covered in the videos." },
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
    { title: "Alternative Options", text: "Could you have gained this information or entertainment in a better way (e.g., reading an article or a different creator)?" },
    { title: "The Core Lesson", text: "If you had to summarize the 'moral of the story', what would it be?" },
    { title: "Summarize the Impact", text: "State clearly whether this content aligns with the person you want to be today." }
  ],

  // STEP 6 — ACTION
  [
    { title: "Think Adjustments", text: "Small tweaks are enough." },
    { title: "Curate Your Feed", text: "Decide if you need to 'tell' the algorithm to show you less of this, or more of something else." },
    { title: "Viewing Boundaries", text: "Decide now: Will you seek out more of this, or do you need a break from this topic?" }
  ]
];


export const PLACEHOLDERS = ["This week, I noticed that...", "When I think about it, I felt…", 
                      "Something that felt positive was…", "I think this happened because…", 
                      "One thing I'm taking away is…", "A small step I can take is…"];