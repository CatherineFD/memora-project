import type { ReactNode, CSSProperties } from 'react';

// --- Общие типы ---

export type GridAlign = 'top' | 'middle' | 'bottom' | 'stretch';
export type GridJustify =
  | 'start'
  | 'end'
  | 'center'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';

export type GridBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/** Значение gutter — либо одно число, либо [горизонтальный, вертикальный] */
export type GridGutter = number | [number, number];

/** Responsive gutter — разные значения для разных брейкпоинтов */
export type GridResponsiveGutter = Partial<Record<GridBreakpoint, number>>;

// --- GridRow ---

export interface GridRowProps {
  children?: ReactNode;
  /** Вертикальное выравнивание колонок */
  align?: GridAlign;
  /** Горизонтальное распределение колонок */
  justify?: GridJustify;
  /** Отступы между колонками */
  gutter?: GridGutter | GridResponsiveGutter;
  /** Переносить ли колонки на новую строку */
  wrap?: boolean;
  /** Дополнительный CSS класс */
  className?: string;
  /** Inline стили */
  style?: CSSProperties;
  /** ID */
  id?: string;
}

// --- GridCol ---

/** Конфигурация колонки для конкретного брейкпоинта */
export interface GridColBreakpointConfig {
  /** Ширина колонки (1-24) */
  span?: number;
  /** Отступ слева (1-24) */
  offset?: number;
  /** Порядок */
  order?: number;
  /** Сдвиг влево (1-24) */
  pull?: number;
  /** Сдвиг вправо (1-24) */
  push?: number;
}

export interface GridColProps {
  children?: ReactNode;
  /** Ширина колонки (1-24). Если не указан — колонка подстраивается под содержимое */
  span?: number;
  /** Отступ слева (1-24) */
  offset?: number;
  /** Порядок колонки */
  order?: number;
  /** Сдвиг влево (1-24) */
  pull?: number;
  /** Сдвиг вправо (1-24) */
  push?: number;
  /** flex значение (например, 'auto', '1', 'none') */
  flex?: string | number;

  /** Конфигурация для xs (<576px) */
  xs?: number | GridColBreakpointConfig;
  /** Конфигурация для sm (≥576px) */
  sm?: number | GridColBreakpointConfig;
  /** Конфигурация для md (≥768px) */
  md?: number | GridColBreakpointConfig;
  /** Конфигурация для lg (≥992px) */
  lg?: number | GridColBreakpointConfig;
  /** Конфигурация для xl (≥1200px) */
  xl?: number | GridColBreakpointConfig;
  /** Конфигурация для xxl (≥1600px) */
  xxl?: number | GridColBreakpointConfig;

  /** Дополнительный CSS класс */
  className?: string;
  /** Inline стили */
  style?: CSSProperties;
}