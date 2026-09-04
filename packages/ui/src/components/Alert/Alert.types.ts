import type { ReactNode } from 'react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  /** Заголовок алерта */
  title: ReactNode;
  /** Дополнительное описание */
  description?: ReactNode;
  /** Визуальный стиль */
  variant?: AlertVariant;
  /** Показывать иконку */
  showIcon?: boolean;
  /** Можно ли закрыть */
  closable?: boolean;
  /** Обработчик закрытия */
  onClose?: () => void;
  /** Кастомная иконка */
  icon?: ReactNode;
  /** Действие (кнопка, ссылка и т.д.) */
  action?: ReactNode;
  /** Режим баннера (на всю ширину без скруглений) */
  banner?: boolean;
  /** Дополнительный CSS класс */
  className?: string;
  /** Inline стили */
  style?: React.CSSProperties;
}