/**
 * Форматирует дату в читаемый вид на русском.
 * Пример: "15 авг. 2026" или "15.08.2026"
 */
export const formatDate = (dateInput: string | Date, options?: Intl.DateTimeFormatOptions): string => {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  return new Intl.DateTimeFormat('ru-RU', options || defaultOptions).format(date);
};

/**
 * Возвращает срок до следующего повторения.
 * Идеально для UI карточек: "Завтра", "Через 3 дня", "Просрочено"
 */
export const getRelativeReviewTime = (nextReviewAt: string | Date): string => {
  const now = new Date();
  const target = typeof nextReviewAt === 'string' ? new Date(nextReviewAt) : nextReviewAt;
  
  // Сбрасываем время до полуночи для корректного сравнения дней
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDay = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  
  const diffTime = targetDay.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'Просрочено';
  if (diffDays === 0) return 'Сегодня';
  if (diffDays === 1) return 'Завтра';
  if (diffDays < 5) return `Через ${diffDays} дня`;
  
  return formatDate(target, { day: 'numeric', month: 'long' });
};

/**
 * Добавляет указанное количество дней к дате.
 */
export const addDays = (dateInput: string | Date, days: number): Date => {
  const result = new Date(dateInput);
  result.setDate(result.getDate() + days);
  return result;
};