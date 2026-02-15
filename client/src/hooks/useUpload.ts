import { useNavigate } from "react-router";
import { uploadWatchHistory } from "../api/upload";

export function useUpload() {
  const navigate = useNavigate();

  async function start(file: File) {
    const data = await uploadWatchHistory(file);
    localStorage.setItem("processingJobId", data.job_id);
    navigate(`/processing/${data.job_id}`);
    return data.job_id;
  }

  return { start };
}
