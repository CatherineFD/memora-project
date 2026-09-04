import type { ReactNode } from 'react';
import type { MenuProps, DropdownProps as DropdownPropsAntd } from 'antd';

export type DropdownTrigger = 'click' | 'hover' | 'contextMenu';
export type DropdownPlacement =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight';

//TODO заменить items на другой тип
export interface DropdownProps {
  /** Элемент, который открывает дропдаун */
  children: ReactNode;
  /** Пункты меню */
  items: MenuProps['items'];
  /** Триггер открытия */
  trigger?: DropdownTrigger | DropdownTrigger[];
  /** Позиционирование */
  placement?: DropdownPlacement;
  /** Отключен ли дропдаун */
  disabled?: boolean;
  /** Обработчик видимости */
  onOpenChange?: (open: boolean) => void;
  /** Обработчик клика по пункту меню */
  onClick?: (key: string) => void;
  /** Дополнительный CSS класс */
  className?: string;
  /** Inline стили */
  styles?: DropdownPropsAntd['styles'];
}