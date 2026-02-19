import { api } from "./api";

export async function getInsights() {
  const response = await api.get('/api/insights');
  return response.data;
}

export async function getInsight(id: string) {
  const response = await api.get(`/api/insights/${id}`)
  return response.data;
}

export async function editInsightImage(id: string, fixes: string) {
  const response = await api.patch(`/api/insights/${id}/edit-image`, { fixes })
  return response.data;
}