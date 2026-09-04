import type { ReactNode } from 'react';

export type ProgressVariant = 'line' | 'circle' | 'dashboard';
export type ProgressStatus = 'normal' | 'active' | 'success' | 'exception';
export type ProgressSize = 'small' | 'medium' | 'large';

export interface ProgressProps {
  /** Процент выполнения (0-100) */
  percent?: number;
  /** Тип прогресса */
  variant?: ProgressVariant;
  /** Статус */
  status?: ProgressStatus;
  /** Размер */
  size?: ProgressSize;
  /** Показывать ли информацию (процент) */
  showInfo?: boolean;
  /** Количество шагов (для step-прогресса) */
  steps?: number;
  /** Цвет линии (строка или массив для градиента) */
  strokeColor?: string | string[];
  /** Цвет трека (фона) */
  trailColor?: string;
  /** Ширина линии (для line) */
  strokeWidth?: number;
  /** Размер круга (для circle/dashboard) */
  circleSize?: number;
  /** Формат отображения текста */
  format?: (percent: number, successPercent: number) => ReactNode;
  /** Дополнительный CSS класс */
  className?: string;
  /** Inline стили */
  style?: React.CSSProperties;
}