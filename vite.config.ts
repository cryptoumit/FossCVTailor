import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig(({ command }) => ({
  plugins: command === 'serve' ? [react()] : [],
  oxc: { jsx: { runtime: 'automatic' } },
}));
