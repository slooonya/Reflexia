import { api } from './api';

export async function sendReflectionMessage(message: string, step: number, insightId: string) {
  const response = await api.post("/api/reflection/chat", { message, step, insight_id: insightId });
  return response.data.reply;
}

export async function completeReflection(insightId) {
  const response = await api.post(`/api/reflection/complete/${insightId}`);
  return response.data.reflection_summary;
}

export async function loadReflectionSession(insightId: string){
  const response = await api.get(`/api/reflection/session/${insightId}`)
  return response.data;
}

export async function getReflectionSummary(insightId) {
  const response = await api.get(`/api/reflection/summary/${insightId}`)
  return response.data;
}

export async function updateReflectionStep(insightId, step) {
  await api.post("/api/reflection/step", { insight_id: insightId, step })
}