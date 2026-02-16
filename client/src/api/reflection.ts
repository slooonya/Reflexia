import axios from "axios";

export async function sendReflectionMessage(message: string, step: number, insightId: string) {
  const response = await axios.post("/api/reflection/chat", { message, step, insight_id: insightId });
  return response.data.reply;
}

export async function completeReflection(insightId) {
  const response = await axios.post(`/api/reflection/complete/${insightId}`);
  return response.data.summary;
}

export async function loadReflectionSession(insightId: string){
  const response = await axios.get(`/api/reflection/session/${insightId}`)
  return response.data;
}

export async function getReflectionSummary(insightId) {
  const response = await axios.get(`api/reflection/summary/${insightId}`)
  return response.data;
}

export async function updateReflectionStep(insightId, step) {
  await axios.post("/api/reflection/step", { insight_id: insightId, step })
}