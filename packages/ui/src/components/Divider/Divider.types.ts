import type { ReactNode, CSSProperties } from 'react';

export type DividerVariant = 'dashed' | 'dotted' | 'solid';
export type DividerOrientation = 'horizontal' | 'vertical';

export interface DividerProps {
  /** Контент внутри разделителя (только для horizontal) */
  children?: ReactNode;
  /** Направление разделителя */
  variant?: DividerVariant;
  /** Пунктирная линия */
  dashed?: boolean;
  /** «Плоский» стиль (текст без отступов-возвышений) */
  plain?: boolean;
  /** Позиция текста внутри разделителя */
  orientation?: DividerOrientation;
  /** Дополнительный CSS класс */
  className?: string;
  /** Inline стили */
  style?: CSSProperties;
}