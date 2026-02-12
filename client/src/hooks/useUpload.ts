import { useState, useEffect } from "react";
import { uploadWatchHistory } from "../api/upload";
import { useJobProgress } from "./useJobProgress";
import { useNavigate } from "react-router";

export function useUpload() {
  const [jobId, setJobId] = useState<string | null>(null);
  const { progress, status } = useJobProgress(jobId);
  const navigate = useNavigate();

  async function start(file: File) {
    const data = await uploadWatchHistory(file);
    setJobId(data.job_id);
    navigate(`/processing/${data.job_id}`);
  }

  useEffect(() => {
    if (progress === 100) {
      navigate("/gallery");
    }
  }, [progress, navigate]);

  return { progress, status, start };
}
