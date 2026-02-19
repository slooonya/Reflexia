import { api } from "./api";

export async function login(data) {
  const response = await api.post("/api/auth/login", data);
  return response.data;
}

export async function logout() {
  const response = await api.post("/api/auth/logout");
  return response.data;
}

export async function register(data) {
  const response = await api.post("/api/auth/register", data);
  return response.data;
}

export async function refresh() {
  const response = await api.post("/api/auth/refresh");
  return response.data;
}

export async function get_me() {
  const response = await api.get("/api/auth/me");
  return response.data;
}