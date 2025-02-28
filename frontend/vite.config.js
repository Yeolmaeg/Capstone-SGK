import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Vite 서버를 5173 포트에서 실행
    host: '0.0.0.0', // Docker 컨테이너에서 접근 가능하게 설정
    strictPort: true
  }
});
