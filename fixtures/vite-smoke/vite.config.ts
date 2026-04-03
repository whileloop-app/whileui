import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { withWhileUIViteCompat } from '@thewhileloop/whileui/vite';

export default defineConfig(withWhileUIViteCompat({ plugins: [react()] }));
