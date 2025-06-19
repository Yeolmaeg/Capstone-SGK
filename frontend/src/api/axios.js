import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "/api"; // 환경에 따라 자동 처리

console.log("🚨 VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);
console.log("✅ baseURL used:", baseURL);

const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
