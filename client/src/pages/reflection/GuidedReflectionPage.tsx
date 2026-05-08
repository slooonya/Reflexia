import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { ProgressHeader } from "./ProgressHeader";
import { Polaroid } from '../../components/Polaroid';
import { ChatMessages } from './ChatMessages';
import { ChatIntro } from './ChatIntro';
import { ChatSummary } from './ChatSummary';
import { Loader } from '../../components/Loader';
import type { Insight } from '../../types/insight';
import { getInsight } from '../../api/insights';
import { ChatTypingIndicator } from './ChatTypingIndicator';
import { PromptInput } from '../../components/PromptInput';
import { useChat } from '../../hooks/useChat';
import { completeReflection, loadReflectionSession, updateReflectionStep } from '../../api/reflection';
import { pickStepPrompt } from '../../utils/randomizer';
import { InlineLoader } from '../../components/InlineLoader';
import { Button } from '../../components/Button';
import { ImageOverlay } from '../../components/ImageOverlay';
import { REFLECTION_STEPS, TIPS, PLACEHOLDERS } from './reflectionSteps';

import NextIcon from '../../assets/icons/next-icon.svg';
import './GuidedReflectionPage.css';

export function GuidedReflectionPage() {
  const [step, setStep] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [entry, setEntry] = useState<Insight | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);

  const { id } = useParams();
  const safeId = id ?? "";

  const { messages, botLoading, sendMessage, hydrate } = useChat(safeId, step);

  useEffect(() => {
    if (!id) return;
    getInsight(id).then(setEntry);

    loadReflectionSession(id).then(data => {
      if (data.exists) {
        setStep(data.step);
        hydrate(data.messages);
      }
    })
  }, [id, hydrate]);

  const isComplete = step === REFLECTION_STEPS.length;

  const stepPrompt = useMemo(() => {
    if (isComplete) return "";
    return pickStepPrompt(step);
  }, [step, isComplete]);

  if (!entry) return <Loader />;

  function handleSendMessage(message) {
    if (!hasStarted) {
      const stagePromptMessage = {
        role: "system",
        content: stepPrompt
      };

      hydrate([...messages, stagePromptMessage]);
      setHasStarted(true);
    }

    sendMessage(message);
  }

  async function handleNextStep() {
    if (!id) return;

    const nextStep = step + 1;

    setStep(nextStep);
    setHasStarted(false);

    if (nextStep === REFLECTION_STEPS.length) {
      setSummaryLoading(true);

      try {
        const summaryText = await completeReflection(id);
        setSummary(summaryText);
        setStep(nextStep);
      } finally {
        setSummaryLoading(false);
      }
      
      return;
    }

    await updateReflectionStep(id, nextStep);
  }

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
          
          <div className="reflective-image" onClick={() => setIsImageOpen(true)}>
            <Polaroid imageSrc={entry.image_url} caption={entry.period_label}/>
          </div>
        </div>

        <div className="reflection-right-container">
          {!isComplete && !hasStarted && (
            <ChatIntro prompt={stepPrompt} tips={TIPS[step]}/>
          )}

          {!isComplete && hasStarted && (
            <ChatMessages chatMessages={messages} />
          )}

          {botLoading && <ChatTypingIndicator />}

          {!isComplete && hasStarted && messages.length >= 2 && (
            <Button variant='secondary' onClick={handleNextStep} icon={NextIcon}>Next</Button>
          )}

          {isComplete && summaryLoading && (
            <InlineLoader label="Generating your reflection summary…" />
          )}

          {isComplete && !summaryLoading && summary && (
            <ChatSummary summary={summary} />
          )}

          {!isComplete && (
            <PromptInput placeholder={PLACEHOLDERS[step]} onSubmit={handleSendMessage} disabled={botLoading} />
          )}
        </div>
      </div>
      
      {isImageOpen && (
        <ImageOverlay 
          img={entry.image_url} 
          onClose={() => setIsImageOpen(false)}
        />
      )}
    </>
  );
}