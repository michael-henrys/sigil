import { defineConfig } from 'vite';

export default defineConfig({
  base: '/sigil/',
  root: '.', // Set the root directory
  build: {
    outDir: 'dist', // Output directory
  },
  server: {
    port: 3000, // Development server port
  },
});