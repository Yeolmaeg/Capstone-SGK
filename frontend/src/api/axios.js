// src/api/axios.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // 백엔드 기본 주소 (팀원이 알려준 주소로 바꿔!)
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // 요청 제한 시간 (선택)
});

export default apiClient;
