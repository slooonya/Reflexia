import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useJobProgress } from "../../hooks/useJobProgress";
import { ProgressBar } from "../../components/ProgressBar";

import './ProcessingPage.css'

export function ProcessingPage() {
  const { jobId } = useParams();
  const { progress, status } = useJobProgress(jobId);
  const navigate = useNavigate();

  useEffect(() => {
    if (progress === 100) {
      navigate("/gallery");
    }
  }, [progress, navigate]);

  return (
    <div className="processing-page">
      <h2>Processing Your Watch History…</h2>

      <ProgressBar progress={progress ?? 0} />

      <p>{status}</p>
    </div>
  );
}
