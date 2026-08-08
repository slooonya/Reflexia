import { api } from './api';

export async function uploadWatchHistory(file: File, weeks: number, months: number) {
  const form = new FormData();

  form.append("file", file);
  form.append("weeks", String(weeks));
  form.append("months", String(months));

  const response = await api.post('/api/upload/watch-history', form);

  return response.data;
}