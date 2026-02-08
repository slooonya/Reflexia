import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Polaroid } from '../../components/Polaroid';
import { EditingPrompt } from './EditingPrompt';
import { EditingResult } from './EditingResult';
import { Button } from '../../components/Button';
import { monthlyGalleryData, weeklyGalleryData } from '../gallery/galleryData';

import TestImage from '../../assets/images/test-image.png';
import BackIcon from '../../assets/icons/back-icon.svg';
import './ImageEditingPage.css';

export function ImageEditingPage() {
  const { id, type } = useParams();
  const navigate = useNavigate();

  const [step, setStep] = useState("input");
  const [fixes, setFixes] = useState("");
  const [resultImage, setResultImage] = useState<string | null>(null);

  const FIXES = "Cleaned up some of the background details so the illustration feels less busy and gives you more mental “space” to think.";

  const item = type === "month"
    ? monthlyGalleryData.find(x => x.id === id)
    : weeklyGalleryData.find(x => x.id === id);
  if (!item) return <div>Not found</div>;

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
            <Polaroid imageSrc={item.image} caption={item.caption} />
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