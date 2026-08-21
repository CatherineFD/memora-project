import { authClient } from './client'; 

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const authApi = {
  /**
   * Авторизация пользователя
   */
  login: (payload: LoginPayload) => {
    return authClient.post<LoginResponse>('/auth/login', payload);
  },

  /**
   * Регистрация пользователя
   */
  register: (payload: RegisterPayload) => {
    return authClient.post<LoginResponse>('/auth/register', payload);
  },

  /**
   * Выход из системы
   */
  logout: () => {
    return authClient.post<null>('/auth/logout');
  },
  
  /**
   * Получение данных текущего пользователя
   */
  getMe: () => {
    return authClient.get<LoginResponse['user']>('/auth/me');
  }
};