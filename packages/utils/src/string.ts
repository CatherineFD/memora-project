/**
 * Обрезает строку до указанной длины и добавляет многоточие.
 * Пример: truncate("I have a very long pet dog", 15) -> "I have a very..."
 */
export const truncate = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return str.slice(0, length).trimEnd() + '...';
};

/**
 * Делает первую букву строки заглавной.
 * Пример: capitalize("hello") -> "Hello"
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Экранирует HTML-символы для защиты от XSS при рендеринге пользовательского ввода.
 */
export const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};