import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    federation({
      name: 'vocabulary_mfe',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx', 
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
    react(), 
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5001,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  preview: {
    port: 5001,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});