import { api } from './api';

export async function updateProfile(data) {
  const response = await api.patch("/api/profile", data);
  return response.data;
}

export async function getProfile() {
  const response = await api.get("/api/profile");
  return response.data;
}

export async function uploadPfp(pfp) {
  const form = new FormData();
  form.append("file", pfp);

  const response = await api.patch("/api/profile/pfp", form);
  return response.data;
}

export async function removePfp() {
  const response = await api.delete("/api/profile/pfp")
  return response.data;
}