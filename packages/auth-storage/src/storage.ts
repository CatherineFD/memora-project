interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number; // timestamp, когда access token протухнет
}

class AuthStorage {
  private readonly STORAGE_KEY = 'auth_tokens';

  /**
   * Сохраняем токены после логина
   */
  setTokens(tokens: AuthTokens): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tokens));
  }

  /**
   * Получаем токены
   */
  getTokens(): AuthTokens | null {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) return null;
    
    try {
      return JSON.parse(raw) as AuthTokens;
    } catch {
      return null;
    }
  }

  // Получаем только access token (для фабрики запросов)
  getAccessToken(): string | null {
    const tokens = this.getTokens();
    if (!tokens) return null;
    
    // Проверяем, не протух ли токен
    if (Date.now() >= tokens.expiresAt) {
      return null; // токен протух, нужно делать refresh
    }
    
    return tokens.accessToken;
  }

  // Обновляем только access token (после refresh)
  updateAccessToken(accessToken: string, expiresAt: number): void {
    const tokens = this.getTokens();
    if (!tokens) return;
    
    tokens.accessToken = accessToken;
    tokens.expiresAt = expiresAt;
    this.setTokens(tokens);
  }

  // Удаляем все токены (при logout)
  clearTokens(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // Проверяем, авторизован ли пользователь
  isAuthenticated(): boolean {
    return this.getAccessToken() !== null;
  }
}

export const authStorage = new AuthStorage();