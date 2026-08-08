import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Polaroid } from '../../components/Polaroid';
import { EditingIntro } from './EditingIntro';
import { EditingResult } from './EditingResult';
import { Button } from '../../components/Button';
import { Loader } from '../../components/Loader';
import { editInsightImage, getInsight } from '../../api/insights';
import type { Insight } from '../../types/insight';
import { InlineLoader } from '../../components/InlineLoader';

import BackIcon from '../../assets/icons/back-icon.svg?react';
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

  if (!entry) return <Loader />;

  async function submitFix(userFixes) {
    if (!id) return;

    setStep("loading");

    try {
      const response = await editInsightImage(id, userFixes);
      setFixes(response.fixesSummary);
      setResultImage(response.imageUrl);
      setStep("result");
    } catch (err) {
      console.error(err);
      setStep("input");
    }
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
            <EditingIntro onSubmit={submitFix} />
          )}

          {step === "loading" && (
            <InlineLoader label="Editing your reflective image..." />
          )}

          {step === "result" && (
            <EditingResult fixes={fixes} resultImage={resultImage} onRetry={retry} onAccept={accept} />
          )}
        </div>
      </div>
    </>
  );
}