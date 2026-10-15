import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the build works from any folder, the tailnet preview and an artifact page alike.
export default defineConfig({
  base: './',
  plugins: [react()],
  optimizeDeps: { exclude: ['lucide-react'] },
  // Stable file names so the artifact copy can be republished over the same paths.
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
});
