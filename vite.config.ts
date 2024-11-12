import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import env from 'vite-plugin-env-compatible';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    env({ prefix: 'VITE', mountedPath: 'process.env' }),
  ],
});
