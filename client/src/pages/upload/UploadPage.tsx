import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Navbar } from "../../components/Navbar";
import { UploadBox } from "./UploadBox";
import { InstructionCarousel } from "./InstructionCarousel";
import { ProcessingConfigModal } from "./ProcessingConfigModal";
import { Button } from "../../components/Button";
import { steps } from "./uploadStepsData";
import { getJob } from "../../api/jobs";
import { uploadWatchHistory } from "../../api/upload";

import './UploadPage.css';

export function UploadPage() {
  const navigate = useNavigate();

  const [jobId, setJobId] = useState<string | null>(
    localStorage.getItem("processingJobId")
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showProcessingConfig, setShowProcessingConfig] = useState(false);

  useEffect(() => {
    async function verifyJob() {
      const stored = localStorage.getItem("processingJobId");

      if (!stored) return;

      try {
        const data = await getJob(stored);

        if (data.progress >= 100 || data.status === "done") {
          localStorage.removeItem("processingJobId"
          );
          setJobId(null);
        } else {
          setJobId(stored);
        }
      } catch {
        localStorage.removeItem("processingJobId");
        setJobId(null);
      }
    }

    verifyJob();
  }, []);

  function handleUploadSuccess(file: File) {
    setSelectedFile(file);
    setShowProcessingConfig(true);
  }

  function handleCancelProcessing() {
    setShowProcessingConfig(false);
    setSelectedFile(null);
  }

  async function handleStartProcessing({ weeks, months }: { weeks: number; months: number }) {
    if (!selectedFile) return;

    try {
      const data = await uploadWatchHistory(selectedFile, weeks, months);

      const newJobId = data.job_id;

      localStorage.setItem(
        "processingJobId",
        newJobId
      );

      setShowProcessingConfig(false);
      setSelectedFile(null);
      setJobId(newJobId);

      navigate(`/processing/${newJobId}`);
    } catch (error) {
      console.error("Failed to start processing:", error);
    }
  }

  return (
    <>
      <title>Watch History Upload</title>

      <Navbar />

      <div className="upload-page-content">
        <div className="upload-left-container">
          <h1>Upload <br />
              Your Watch <br />
              History
          </h1>

          <p>To generate reflective summaries and images, we'll need a copy of your YouTube report. You can retrieve the data by following the instructions.</p>
            
            
          {!jobId ? (
            <UploadBox onSuccess={handleUploadSuccess} />
          ) : (
            <div className="processing-btn">
              <Button variant="accent" onClick={() => navigate(`/processing/${jobId}`)}>
                View Processing Status
              </Button>
            </div>
          )}
        </div>

        <div className="upload-right-container">
          <InstructionCarousel steps={steps} />
        </div>
      </div>

      <ProcessingConfigModal 
        open={showProcessingConfig} 
        onStart={handleStartProcessing}
        onCancel={handleCancelProcessing} 
      />
    </>
  );
}