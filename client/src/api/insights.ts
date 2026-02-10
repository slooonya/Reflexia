import axios from 'axios';

export async function getInsights() {
  const response = await axios.get('/api/insights');
  return response.data;
}

export async function getInsight(id: string) {
  const response = await axios.get(`/api/insights/${id}`)
  return response.data;
}