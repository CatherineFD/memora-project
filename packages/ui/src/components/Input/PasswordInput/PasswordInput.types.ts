import type { ReactNode, CSSProperties } from 'react';

export type PasswordInputSize = 'small' | 'medium' | 'large';
export type PasswordInputVariant = 'outlined' | 'filled' | 'borderless';
export type PasswordInputStatus = 'default' | 'error' | 'warning';

export interface PasswordInputProps {
  /** Текущее значение */
  value?: string;
  /** Значение по умолчанию */
  defaultValue?: string;
  /** Плейсхолдер */
  placeholder?: string;
  /** Размер */
  size?: PasswordInputSize;
  /** Вариант стиля */
  variant?: PasswordInputVariant;
  /** Статус (валидация) */
  status?: PasswordInputStatus;
  /** Отключен ли инпут */
  disabled?: boolean;
  /** Разрешить очистку */
  allowClear?: boolean;
  /** Максимальная длина */
  maxLength?: number;
  
  /** Показывать переключатель видимости (глазик) */
  visibilityToggle?: boolean | { tabIndex?: number; visible?: boolean; onVisibleChange?: (visible: boolean) => void };
  /** Иконка для видимого/скрытого состояния */
  iconRender?: (visible: boolean) => ReactNode;
  
  /** Обработчик изменения значения */
  onChange?: (value: string) => void;
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
  /** Автоматическое отключение автозаполнения */
  autoComplete?: string;
}