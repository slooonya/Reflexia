import { api } from './api';

export async function getJob(jobId) {
  const response = await api.get(`/api/jobs/${jobId}`)
  return response.data;
}