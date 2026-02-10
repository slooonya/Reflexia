import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Polaroid } from '../../components/Polaroid';
import { EditingPrompt } from './EditingPrompt';
import { EditingResult } from './EditingResult';
import { Button } from '../../components/Button';
import { getInsight } from '../../api/insights';
import type { Insight } from '../../types/insight';

import TestImage from '../../assets/images/test-image.png';
import BackIcon from '../../assets/icons/back-icon.svg';
import './ImageEditingPage.css';

export function ImageEditingPage() {
  const { id, type } = useParams();
  const navigate = useNavigate();

  const [step, setStep] = useState("input");
  const [fixes, setFixes] = useState("");
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [entry, setEntry] = useState<Insight | null>(null);

  useEffect(() => {
    if (!id) return;
    getInsight(id).then(setEntry);
  }, [id]);

  if (!entry) return <div>Loading...</div>;

  const FIXES = "Cleaned up some of the background details so the illustration feels less busy and gives you more mental “space” to think.";

  function submitFix() {
    setFixes(FIXES);

    setResultImage(TestImage);
    setStep("result");
  }

  function retry() {
    setStep("input");
  }

  function accept() {
    navigate(`/details/${type}/${id}`);
  }

  return (
    <>
      <title>Image Editing</title>

      <div className="editing-back">
        <Button variant="accent" onClick={() => navigate(-1)} icon={BackIcon}>
          Go back
        </Button>
      </div>

      <div className="editing-page-content">
        <div className="editing-left-container">
          <div className="polaroid-container">
            <Polaroid imageSrc={entry.image_url} caption={entry.period_label} />
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