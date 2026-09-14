import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        user_mfe: 'http://localhost:5002/assets/remoteEntry.js',
        vocabulary_mfe: 'http://localhost:5001/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  optimizeDeps: {
    exclude: ['user_mfe', 'vocabulary_mfe'],
  },
  build: {
    target: 'esnext', // Обязательно для Module Federation в Vite
    minify: false,    // Рекомендуется для dev-сборки, чтобы легче было дебажить
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  server: {
    port: 5000,
    // Разрешаем CORS для локальной разработки, чтобы хост мог забирать remoteEntry
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});