import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/hccf.io/', // Replace <repository-name> with your GitHub repo name
  plugins: [react()],
});