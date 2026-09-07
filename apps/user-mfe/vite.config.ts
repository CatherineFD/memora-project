import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    federation({
      name: 'user_mfe', 
      filename: 'remoteEntry.js', // Имя файла точки входа
      exposes: {
        './App': './src/App.tsx', 
      },
      // Массив должен точно совпадать с тем, что в хосте
      shared: ['react', 'react-dom'],
    }),
    react(), 
  ],
  build: {
    target: 'esnext', // Обязательно для Module Federation
    minify: false,    // Удобно для отладки
    cssCodeSplit: false, // ВАЖНО: предотвращает потерю стилей в микрофронтендах при сборке
  },
  server: {
    port: 5002, // Должен совпадать с портом в конфиге хоста
    headers: {
      'Access-Control-Allow-Origin': '*', // КРИТИЧЕСКИ ВАЖНО: разрешает хосту (порт 5000) забирать файлы
    },
  },
  // Рекомендация: настройка для режима preview (после npm run build)
  preview: {
    port: 5002,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});