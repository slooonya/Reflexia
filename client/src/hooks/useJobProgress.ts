import { useEffect, useState } from "react";
import { getJob } from "../api/jobs";

export function useJobProgress(jobId) {
  const [progress, setProgress] = useState(null);
  const [status, setStatus] =  useState("");

  useEffect(() => {
    if (!jobId) return;

    const id = setInterval(async () => {
      const data = await getJob(jobId);
      setProgress(data.progress);
      setStatus(data.status);

      if (data.progress >= 100) {
        clearInterval(id);
      }
    }, 1000);

    return () => clearInterval(id);
  }, [jobId]);

  return { progress, status };
}