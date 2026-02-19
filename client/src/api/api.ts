import axios from "axios";
import { refresh } from "./auth";

export const api = axios.create({
  withCredentials: true
});

let isRefreshing = false;
let failedQueue: any[] = [];

function processQueue(error) {
  failedQueue.forEach(p => {
    if (error) {
      p.reject(error);
    } else {
      p.resolve();
    }
  });

  failedQueue = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      isRefreshing = true;

      try {
        await refresh();
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        window.location.href = "/auth?reason=expired";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }      
    }
    return Promise.reject(error);
  }
);