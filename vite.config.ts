import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcore from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcore()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['tests/e2e/**/*', 'node_modules/**/*'],
  },
} as import('vite').UserConfig & { test: import('vitest/config').UserConfig['test'] });
