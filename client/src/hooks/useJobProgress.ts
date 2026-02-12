import axios from "axios";
import { useEffect, useState } from "react";

export function useJobProgress(jobId) {
  const [progress, setProgress] = useState(null);
  const [status, setStatus] =  useState("");

  useEffect(() => {
    if (!jobId) return;

    const id = setInterval(async () => {
      const response = await axios.get(`/api/jobs/${jobId}`);
      setProgress(response.data.progress);
      setStatus(response.data.status);

      if (response.data.progress >= 100) {
        clearInterval(id);
      }
    }, 1000);

    return () => clearInterval(id);
  }, [jobId]);

  return { progress, status };
}