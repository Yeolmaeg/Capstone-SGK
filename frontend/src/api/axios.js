import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "/api"; // 환경에 따라 자동 처리

const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default apiClient;
