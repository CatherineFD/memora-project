import type { ReactNode } from 'react';

export interface CheckboxProps {
  /** Значение чекбокса (контролируемое состояние) */
  checked?: boolean;
  /** Значение чекбокса по умолчанию (неконтролируемое состояние) */
  defaultChecked?: boolean;
  /** Отключен ли чекбокс */
  disabled?: boolean;
  /** Неопределенное состояние (серая галочка / indeterminate) */
  indeterminate?: boolean;
  
  /** 
   * Обработчик изменения состояния. 
   * Мы намеренно отдаем boolean, чтобы скрыть внутреннюю реализацию antd.
   */
  onChange?: (checked: boolean) => void;
  
  /** Контент (текст лейбла) */
  children?: ReactNode;
  
  /** Дополнительный CSS класс */
  className?: string;
  /** ID для связки с label */
  id?: string;
  /** Имя поля (name) */
  name?: string;
}