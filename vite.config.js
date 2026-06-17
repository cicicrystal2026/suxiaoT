import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages project site is served from /<repo>/
export default defineConfig({
  base: '/suxiaoT/',
  plugins: [react()],
});
