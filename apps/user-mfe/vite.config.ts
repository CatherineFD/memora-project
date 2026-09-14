import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import path from 'path';

export default defineConfig({
  plugins: [
    federation({
      name: 'user_mfe', 
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx',
        './Login': './src/modules/Login/index.tsx',
        './Register': './src/modules/Register/index.tsx', 
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
    port: 5002,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  preview: {
    port: 5002,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@my-org/styles/variables" as *; @use "@my-org/styles/mixins" as *;`,
      },
    },
  },
  resolve: {
    alias: {
      '@my-org/styles': path.resolve(__dirname, '../../packages/styles/src'),
    },
  },
});