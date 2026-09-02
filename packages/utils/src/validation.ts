/**
 * Базовая проверка email по регулярному выражению.
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Проверяет, что пароль содержит минимум 8 символов.
 */
export const isPasswordValid = (password: string): boolean => {
  return password.length >= 8;
};