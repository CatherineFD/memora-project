import type { ReactNode } from 'react';

export type TabsType = 'line' | 'card';
export type TabsSize = 'small' | 'medium' | 'large';

export interface TabItem {
  /** Уникальный ключ таба */
  key: string;
  /** Заголовок таба */
  label: ReactNode;
  /** Содержимое таба */
  children?: ReactNode;
  /** Отключен ли таб */
  disabled?: boolean;
  /** Иконка перед заголовком */
  icon?: ReactNode;
  /** Можно ли закрыть (только для type="card") */
  closable?: boolean;
}

export interface TabsProps {
  /** Активный таб (контролируемое состояние) */
  activeKey?: string;
  /** Активный таб по умолчанию (неконтролируемое состояние) */
  defaultActiveKey?: string;
  /** Массив табов */
  items: TabItem[];
  /** Тип табов */
  type?: TabsType;
  /** Размер табов */
  size?: TabsSize;
  
  /** Обработчик изменения активного таба */
  onChange?: (key: string) => void;
  /** Обработчик закрытия таба (для type="card") */
  onEdit?: (key: string, action: 'add' | 'remove') => void;
  
  /** Показать кнопку добавления (для type="card") */
  hideAdd?: boolean;
  /** Центрировать табы */
  centered?: boolean;
  
  /** Дополнительный CSS класс */
  className?: string;
  /** Inline стили */
  style?: React.CSSProperties;
}