import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useJobProgress } from "../../hooks/useJobProgress";
import { ProgressBar } from "../../components/ProgressBar";
import { Navbar } from "../../components/Navbar";
import { Button } from "../../components/Button";
import BackIcon from "../../assets/icons/back-icon.svg";

import './ProcessingPage.css'

export function ProcessingPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!jobId) {
      const stored = localStorage.getItem("processingJobId");
      if (stored) navigate(`/processing/${stored}`);
      else navigate("/upload");
    }
  }, [jobId, navigate]);

  const { progress, status } = useJobProgress(jobId);

  useEffect(() => {
    if (status === "done") {
      navigate("/gallery");
    }
  }, [navigate, status]);

  return (
    <>
      <Navbar />

      <div className="processing-back">
        <Button variant="accent" onClick={() => navigate("/upload")} icon={BackIcon}>
          Go back
        </Button>
      </div>

      <div className="processing-page">
        <h2>Processing Your Watch History…</h2>

        <ProgressBar progress={progress ?? 0} />

        <p>{status}</p>
      </div>
    </>
  );
}
