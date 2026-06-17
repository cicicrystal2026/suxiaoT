import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: GitHub Pages 项目站点从 /<repo>/ 提供；用 VITE_BASE 可覆盖（如单后端托管时设为 /）
export default defineConfig({
  base: process.env.VITE_BASE || '/suxiaoT/',
  plugins: [react()],
  server: {
    // 开发时前端 /api 转发到本地后端，避免跨域
    proxy: {
      '/api': 'http://localhost:8787',
    },
  },
});
