import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ProgressHeader } from "./ProgressHeader";
import { Polaroid } from '../../components/Polaroid';
import { ChatInput } from './ChatInput';
import { ChatMessages } from './ChatMessages';
import { ChatIntro } from './ChatIntro';
import { ChatSummary } from './ChatSummary';
import type { Insight } from '../../types/insight';
import { getInsight } from '../../api/insights';

import NextIcon from '../../assets/icons/next-icon.svg';
import './GuidedReflectionPage.css';

export function GuidedReflectionPage() {
  const [step, setStep] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [entry, setEntry] = useState<Insight | null>(null);

  const REFLECTION_STEPS = ["Description","Feelings", "Evaluation", "Analysis", "Conclusion", "Action Plan"];

  const PROMPTS = ["Looking at this week's image, how was your overall viewing experience?", 
    "How did it feel when you settled in for a long narrative story? Did it feel like a warm hug, or did you feel a little guilty about how long it was taking?", 
    "What part of your viewing this week was genuinely worth the time investment, and what felt like low-value junk food?", 
    "It looks like you have two sides: the one that needs to dance/shake it off and the one that needs to dream/focus. Do you think you're switching between them to keep yourself balanced?", 
    "If you could give your past self some advice about last week's viewing, what would it be?", 
    "Based on everything you've just thought about, what is one specific adjustment you want to make to your viewing habits next week?"];

    const TIPS = [
      {
        1: "Be a Reporter: State the facts. (Who, what, where, when).",
        2: "Check the Clock: Notice if the timing (e.g., late night vs. morning) was consistent for each theme.",
        3: "Define Watching: Note whether you were watching actively or listening/playing in the background."
      },
      {
        1: "Name the Emotion: Use specific words (anxious, inspired, guilty, calm).",
        2: "Body Scan: Notice a physical feeling: Did your shoulders relax, or did your jaw clench?",
        3: "Honesty is Key: It's okay if the feeling was nothing or numb."
      },
      {
        1: "Identify the Click-Off Point: Where did the session stop being helpful?",
        2: "Value vs. Volume: Did 5 minutes of music or 3 hours of story provide more lasting positive impact?",
        3: "Focus on Contribution: What did the content add to your day (positively or negatively)?"
      },
      {
        1: "Look for Because: I watched X because I felt Y.",
        2: "Coping vs. Processing: Try linking what you watched with how you were coping or processing the week.",
        3: ""
      },
      {
        1: "Be Specific: General lessons are hard to implement. Specific lessons stick.",
        2: "Focus on Balance: The goal is usually to balance, not quit.",
        3: "Future You: Think about how you want Next Week You to feel (e.g., less stressed, more present)."
      },
      {
        1: "Make it Small: I will wait 10 minutes before opening YouTube in the morning.",
        2: "Make it Physical: I will stand up and stretch after every 3 music videos.",
        3: "Write it Down: Committing to a plan on paper (or digital note) makes it real."
      }
    ];

  const PLACEHOLDERS = ["This week, I noticed that...", "When I think about it, I felt…", 
                        "Something that felt positive was…", "I think this happened because…", 
                        "One thing I'm taking away is…", "A small step I can take is…"];

  const SUMMARY = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos fuga, corrupti dolores, est sequi, assumenda doloribus nam omnis impedit non pariatur velit? Ea, provident? Minus possimus aspernatur dicta soluta architecto? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos fuga, corrupti dolores, est sequi, assumenda doloribus nam omnis impedit non pariatur velit? Ea, provident? Minus possimus aspernatur dicta soluta architecto? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos fuga, corrupti dolores, est sequi, assumenda doloribus nam omnis impedit non pariatur velit? Ea, provident? Minus possimus aspernatur dicta soluta architecto? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos fuga, corrupti dolores, est sequi, assumenda doloribus nam omnis impedit non pariatur velit? Ea, provident? Minus possimus aspernatur dicta soluta architecto? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos fuga, corrupti dolores, est sequi, assumenda doloribus nam omnis impedit non pariatur velit? Ea, provident? Minus possimus aspernatur dicta soluta architecto? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos fuga, corrupti dolores, est sequi, assumenda doloribus nam omnis impedit non pariatur velit? Ea, provident? Minus possimus aspernatur dicta soluta architecto?"

  const isComplete = step === REFLECTION_STEPS.length;

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    getInsight(id).then(setEntry);
  }, [id]);

  if (!entry) return <div>Loading...</div>;
  
  return (
    <>
      <title>Guided Reflection</title>

      <ProgressHeader step={step} total={REFLECTION_STEPS.length} onBack={() => setStep(s => s - 1)} />

      <div className="reflection-page-content">
        <div className="reflection-left-container">
          <div className="heading">
            {!isComplete && (
              <h1>Step {step + 1}: <br />
              {REFLECTION_STEPS[step]}
            </h1>
            )}
            
            {isComplete && (
              <h1>Reflection <br />
                Summary
              </h1>
            )}
          </div>
          
          <div className="reflective-image">
            <Polaroid imageSrc={entry.image_url} caption={entry.period_label}/>
          </div>
        </div>

        <div className="reflection-right-container">
          {!isComplete && !hasStarted && (
            <ChatIntro prompt={PROMPTS[step]} tips={TIPS[step]}/>
          )}

          {!isComplete && hasStarted && (
            <ChatMessages chatMessages={chatMessages} />
          )}

          {hasStarted && chatMessages.length >= 6 && (
            <button
              className="next-step-button"
              onClick={() => {
                setStep(s => s + 1);
                setHasStarted(false);
                setChatMessages([]);
              }}
            >
              Next
              <img src={NextIcon}></img>
            </button>
          )}

          {isComplete && (
            <ChatSummary summary={SUMMARY} />
          )}

          {!isComplete && (
            <ChatInput placeholder={PLACEHOLDERS[step]} chatMessages={chatMessages} 
                       setChatMessages={setChatMessages} setHasStarted={setHasStarted}/>
          )}
        </div>
      </div>
    </>
  );
}