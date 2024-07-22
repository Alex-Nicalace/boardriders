import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';
import checker from 'vite-plugin-checker';
import pluginQuery from '@tanstack/eslint-plugin-query';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    pluginQuery.configs['flat/recommended'],
    react(),
    eslint(),
    svgr(),
    checker({ typescript: true }),
  ],
});
