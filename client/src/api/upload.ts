import axios from 'axios';

export async function uploadWatchHistory(file: File) {
  const form = new FormData();
  form.append("file", file)

  const response = await axios.post('/api/upload/watch-history', form);
  return response.data;
}