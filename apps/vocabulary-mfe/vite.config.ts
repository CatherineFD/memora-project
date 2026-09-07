import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    federation({
      name: 'vocabulary_mfe', // Совпадает с ключом в remotes хоста
      filename: 'remoteEntry.js',
      exposes: {
        // Замените './src/App.tsx' на реальный путь к вашему компоненту
        './App': './src/App.tsx', 
      },
      shared: ['react', 'react-dom'],
    }),
    react(), 
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false, // ВАЖНО: предотвращает потерю стилей
  },
  server: {
    port: 5001, // Должен совпадать с портом в конфиге хоста
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