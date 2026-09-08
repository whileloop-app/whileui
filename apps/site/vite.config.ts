import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

/**
 * No `withWhileUIViteCompat` here, and that is the point.
 *
 * That helper aliases `react-native` to `react-native-web` so the native track
 * can render in a browser. The DOM track has no React Native in it, so this is
 * an ordinary Vite + React + Tailwind app with nothing in the way. If this file
 * ever needs the compat helper, something has imported across the tracks.
 */
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@thewhileloop/whileui/web': resolve(__dirname, '../../packages/ui/src/web'),
    },
  },
  server: { port: 8083 },
});
