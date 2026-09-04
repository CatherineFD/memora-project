import type { ReactNode } from 'react';

export type SelectValue = string | number | string[] | number[];

export interface SelectOption {
  /** Значение опции */
  value: string | number;
  /** Отображаемый текст */
  label: ReactNode;
  /** Отключена ли опция */
  disabled?: boolean;
}

export interface SelectProps {
  /** Текущее значение (контролируемое состояние) */
  value?: SelectValue;
  /** Значение по умолчанию (неконтролируемое состояние) */
  defaultValue?: SelectValue;
  /** Массив опций */
  options?: SelectOption[];
  /** Множественный выбор */
  multiple?: boolean;
  /** Отключен ли селект */
  disabled?: boolean;
  /** Загрузка данных */
  loading?: boolean;
  /** Плейсхолдер */
  placeholder?: string;
  /** Размер компонента */
  size?: 'small' | 'medium' | 'large';
  /** Разрешить поиск */
  showSearch?: boolean;
  /** Разрешить очистку */
  allowClear?: boolean;
  
  /** 
   * Обработчик изменения значения. 
   * Возвращает универсальное значение без зависимости от antd.
   */
  onChange?: (value: SelectValue) => void;
  
  /** Дополнительный CSS класс */
  className?: string;
  /** ID для связки с label */
  id?: string;
  /** Имя поля (name) */
  name?: string;
  /** Стиль (inline styles) */
  style?: React.CSSProperties;
}