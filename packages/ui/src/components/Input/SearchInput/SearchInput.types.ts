import type { ReactNode, CSSProperties } from 'react';

export type SearchInputSize = 'small' | 'medium' | 'large';
export type SearchInputVariant = 'outlined' | 'filled' | 'borderless';
export type SearchInputStatus = 'default' | 'error' | 'warning';

export interface SearchInputProps {
  /** Текущее значение */
  value?: string;
  /** Значение по умолчанию */
  defaultValue?: string;
  /** Плейсхолдер */
  placeholder?: string;
  /** Размер */
  size?: SearchInputSize;
  /** Вариант стиля */
  variant?: SearchInputVariant;
  /** Статус (валидация) */
  status?: SearchInputStatus;
  /** Отключен ли инпут */
  disabled?: boolean;
  /** Загрузка (показывает спиннер) */
  loading?: boolean;
  /** Разрешить очистку */
  allowClear?: boolean;
  /** Максимальная длина */
  maxLength?: number;
  
  /** Кнопка поиска (текст, иконка или true для дефолтной) */
  enterButton?: ReactNode | boolean;
  /** Показывать кнопку поиска только при фокусе */
  showSearchButtonOnFocus?: boolean;
  
  /** Обработчик изменения значения */
  onChange?: (value: string) => void;
  /** Обработчик поиска (Enter или клик по кнопке) */
  onSearch?: (value: string) => void;
  /** Обработчик фокуса */
  onFocus?: () => void;
  /** Обработчик потери фокуса */
  onBlur?: () => void;
  /** Обработчик нажатия Enter */
  onPressEnter?: () => void;
  
  /** Дополнительный CSS класс */
  className?: string;
  /** Inline стили */
  style?: CSSProperties;
  /** ID для связки с label */
  id?: string;
  /** Имя поля */
  name?: string;
  /** Autofocus */
  autoFocus?: boolean;
}