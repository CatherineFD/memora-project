import { authClient } from './client'; 
import type { User } from '@repo/types';

export const userApi = {
  /**
   * Получение полных данных текущего пользователя (с статистикой)
   */
  getMe: () => {
    return authClient.get<User>('/users/me');
  },
};