import type { ReactNode, CSSProperties } from 'react';

export type SegmentSize = 'small' | 'medium' | 'large';
export type SegmentValue = string | number;

export interface SegmentOption {
  /** Уникальное значение опции */
  value: SegmentValue;
  /** Отображаемый текст */
  label?: ReactNode;
  /** Иконка */
  icon?: ReactNode;
  /** Отключена ли опция */
  disabled?: boolean;
  /** Дополнительный CSS класс опции */
  className?: string;
  /** Inline стили опции */
  style?: CSSProperties;
}

export interface SegmentProps {
  /** Текущее значение (контролируемое состояние) */
  value?: SegmentValue;
  /** Значение по умолчанию (неконтролируемое состояние) */
  defaultValue?: SegmentValue;
  /** Массив опций */
  options: SegmentOption[];
  /** Размер */
  size?: SegmentSize;
  /** Растянуть на всю ширину контейнера */
  block?: boolean;
  /** Отключен ли компонент */
  disabled?: boolean;
  
  /** Обработчик изменения значения */
  onChange?: (value: SegmentValue) => void;
  
  /** Дополнительный CSS класс */
  className?: string;
  /** Inline стили */
  style?: CSSProperties;
}