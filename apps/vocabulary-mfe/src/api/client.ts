import { createHttpClient } from '@repo/http-client';
import { authStorage } from '@repo/auth-storage';

// Создаем клиент для Auth-remote
export const vocabularyClient = createHttpClient({
  baseURL: import.meta.env.VITE_VOCABULARY_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  getAuthToken: async () => {
    return authStorage.getAccessToken(); 
  },
  defaultHeaders: { 'X-App-Id': 'vocabulary-mfe' },
});