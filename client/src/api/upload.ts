import { api } from './api';

export async function uploadWatchHistory(file: File) {
  const form = new FormData();
  form.append("file", file)

  const response = await api.post('/api/upload/watch-history', form);
  return response.data;
}