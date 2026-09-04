// packages/ui/src/components/Typography/Typography.types.ts
import type { ReactNode, CSSProperties } from 'react';

export type TypographyVariant = 'title' | 'text' | 'paragraph' | 'link';
export type TypographyLevel = 1 | 2 | 3 | 4 | 5;
export type TypographyType = 'secondary' | 'success' | 'warning' | 'danger';

export interface TypographyEllipsis {
  /** Максимальное количество строк */
  rows?: number;
  /** Показывать ли тултип при обрезке */
  tooltip?: boolean;
}

export interface TypographyProps {
  children?: ReactNode;
  /** Тип типографики */
  variant?: TypographyVariant;
  /** Уровень заголовка (только для variant="title") */
  level?: TypographyLevel;
  /** Цветовой стиль текста */
  type?: TypographyType;

  // --- Декорации ---
  /** Жирный */
  strong?: boolean;
  /** Курсив */
  italic?: boolean;
  /** Подчёркивание */
  underline?: boolean;
  /** Зачёркивание */
  strikethrough?: boolean;
  /** Моноширинный (код) */
  code?: boolean;
  /** Выделение маркером */
  mark?: boolean;
  /** Отключённое состояние */
  disabled?: boolean;

  // --- Поведение ---
  /** Обрезка текста с многоточием */
  ellipsis?: boolean | TypographyEllipsis;
  /** Кнопка копирования */
  copyable?: boolean;

  // --- Только для variant="link" ---
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';

  // --- Общее ---
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}