import axios from "axios";

export async function getJob(jobId) {
  const response = await axios.get(`/api/jobs/${jobId}`)
  return response.data;
}