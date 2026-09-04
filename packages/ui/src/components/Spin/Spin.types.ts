import type { ReactElement, ReactNode } from 'react';

export type SpinSize = 'small' | 'medium' | 'large';

export interface SpinProps {
  /** Состояние загрузки */
  spinning?: boolean;
  /** Размер спиннера */
  size?: SpinSize;
  /** Текст-подсказка под спиннером */
  tip?: ReactNode;
  /** Задержка показа в миллисекундах */
  delay?: number;
  /** Кастомный индикатор загрузки (должен быть HTMLElement) */
  indicator?: ReactElement<HTMLElement>;
  /** Контент, который оборачивается спиннером */
  children?: ReactNode;
  /** Дополнительный CSS класс */
  className?: string;
  /** Inline стили */
  style?: React.CSSProperties;
}