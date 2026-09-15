import { createHttpClient } from '@memora/http-client';
import { authStorage } from '@memora/auth-storage';

// Создаем клиент для Auth-remote
export const authClient = createHttpClient({
  baseURL: import.meta.env.VITE_AUTH_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  getAuthToken: async () => {
    return authStorage.getAccessToken(); 
  },
  defaultHeaders: { 'X-App-Id': 'user-mfe' },
});