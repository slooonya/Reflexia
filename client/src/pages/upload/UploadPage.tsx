import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Navbar } from "../../components/Navbar";
import { UploadBox } from "./UploadBox";
import { InstructionCarousel } from "./InstructionCarousel";
import { Button } from "../../components/Button";
import { steps } from "./uploadStepsData";
import { getJob } from "../../api/jobs";

import './UploadPage.css';

export function UploadPage() {
  const navigate = useNavigate();
  const [jobId, setJobId] = useState<string | null>( localStorage.getItem("processingJobId"));

  useEffect(() => {
    async function verifyJob() {
      const stored = localStorage.getItem("processingJobId");
      if (!stored) return;

      try {
        const data = await getJob(stored);

        if (data.progress >= 100 || data.status == "done") {
          localStorage.removeItem("processingJobId"
          );
          setJobId(null);
        } else {
          setJobId(stored);
        }
      } catch {
        localStorage.removeItem("processsingJobId");
        setJobId(null);
      }
    }

    verifyJob();
  }, []);

  function handleUploadSuccess(newJobId: string) {
    setJobId(newJobId);
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
    </>
  );
}