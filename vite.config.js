// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://task-manager-backend-production-c2c5.up.railway.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
