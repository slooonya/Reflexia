import { useState } from 'react';
import { useNavigate } from 'react-router';
import { BackButton } from '../../components/BackButton';
import { Polaroid } from '../../components/Polaroid';
import { EditingPrompt } from './EditingPrompt';
import { EditingResult } from './EditingResult';

import TestImage from "../../assets/images/test-image.png";
import './ImageEditingPage.css';

export function ImageEditingPage() {
  const [step, setStep] = useState("input");
  const [fixes, setFixes] = useState("");
  const [resultImage, setResultImage] = useState<string | null>(null);

  const FIXES = "Cleaned up some of the background details so the illustration feels less busy and gives you more mental “space” to think.";

  const navigate = useNavigate();

  function submitFix() {
    setFixes(FIXES);

    setResultImage(TestImage);
    setStep("result");
  }

  function retry() {
    setStep("input");
  }

  function accept() {
    navigate("/details");
  }

  return (
    <>
      <title>Image Editing</title>

      <div className="editing-back">
          <BackButton />
      </div>

      <div className="editing-page-content">
        <div className="editing-left-container">
          <div className="polaroid-container">
            <Polaroid imageSrc={TestImage} caption={"Jan. 26 - Feb. 1"} />
          </div>
        </div>

        <div className="editing-right-container">
          {step === "input" && (
            <EditingPrompt onSubmit={submitFix} />
          )}

          {step === "result" && (
            <EditingResult fixes={fixes} resultImage={resultImage} onRetry={retry} onAccept={accept} />
          )}
        </div>
      </div>
    </>
  );
}