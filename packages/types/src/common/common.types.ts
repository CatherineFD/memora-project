/**
 * Общий интерфейс для пагинированных ответов.
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  has_next: boolean;
}

/**
 * Стандартизированный формат ошибки от бэкенда.
 */
export interface ApiErrorResponse {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}

/**
 * ISO-строка даты. Храним как string, конвертируем в Date только в UI.
 */
export type IsoDateString = string;

/**
 * UUID-строка (например, для session_id).
 */
export type UUID = string;

export type CardSortField = 'created_at' | 'word_en' | 'word_ru';
export type SortOrder = 'asc' | 'desc';