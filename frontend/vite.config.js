import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isDocker = typeof process !== 'undefined' && process.env.DOCKER === 'true';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0',
    strictPort: true,
    proxy: {
      '/api': {
        target: isDocker ? 'http://backend:5000' : 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
