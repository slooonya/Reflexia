import { useState } from 'react';
import { ProgressHeader } from "./ProgressHeader";
import './GuidedReflectionPage.css';

export function GuidedReflectionPage() {
  const [step, setStep] = useState(0);

  return (
    <>
      <title>Guided Reflection</title>

      <ProgressHeader step={step} total={6} onBack={() => setStep(s => s - 1)} />

      <div className="reflection-page-content">

      </div>
    </>
  );
}