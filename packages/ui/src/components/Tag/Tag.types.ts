import type { ReactNode } from 'react';

export type TagVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';

export interface TagProps {
  /** Контент тега */
  children?: ReactNode;
  /** Визуальный стиль */
  variant?: TagVariant;
  /** Кастомный цвет (перекрывает variant) */
  color?: string;
  /** Иконка перед текстом */
  icon?: ReactNode;
  /** Можно ли закрыть */
  closable?: boolean;
  /** Обработчик закрытия */
  onClose?: () => void;
  /** Дополнительный CSS класс */
  className?: string;
  /** Inline стили */
  style?: React.CSSProperties;
}