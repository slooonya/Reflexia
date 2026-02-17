import axios from "axios";

export async function updateProfile(data) {
  const response = await axios.patch("/api/profile", data);
  return response.data;
}

export async function getProfile() {
  const response = await axios.get("/api/profile")
  return response.data;
}