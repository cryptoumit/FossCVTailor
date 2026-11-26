import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/').pop();
const base = process.env.GITHUB_ACTIONS === 'true' && repositoryName
  ? `/${repositoryName}/`
  : '/';

export default defineConfig(({ command }) => ({
  base,
  plugins: command === 'serve' ? [react()] : [],
  oxc: { jsx: { runtime: 'automatic' } },
}));
