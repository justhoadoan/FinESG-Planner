import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // API E0 hiện chạy ở 8033 (bàn thử). Các màn FE hiện dùng stub;
      // proxy để sẵn cho khi nối endpoint thật.
      '/api': { target: 'http://localhost:8033', changeOrigin: true },
    },
  },
});
