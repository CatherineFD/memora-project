import type { ReactNode } from 'react';

export type ModalSize = 'small' | 'medium' | 'large';

export interface ModalProps {
  /** Открыт ли модал */
  open: boolean;
  /** Заголовок модала */
  title?: ReactNode;
  /** Контент модала */
  children?: ReactNode;
  /** Размер модала */
  size?: ModalSize;
  
  /** Текст кнопки подтверждения */
  okText?: string;
  /** Текст кнопки отмены */
  cancelText?: string;
  /** Отключена ли кнопка подтверждения */
  okButtonDisabled?: boolean;
  /** Загрузка кнопки подтверждения */
  okButtonLoading?: boolean;
  
  /** Обработчик подтверждения */
  onOk?: () => void;
  /** Обработчик отмены/закрытия */
  onCancel?: () => void;
  
  /** Кастомный футер (полностью заменяет стандартный) */
  footer?: ReactNode;
  /** Скрыть футер */
  hideFooter?: boolean;
  
  /** Можно ли закрыть по клику на маску */
  maskClosable?: boolean;
  /** Можно ли закрыть по Escape */
  keyboard?: boolean;
  /** Показывать крестик закрытия */
  closable?: boolean;
  
  /** Дополнительный CSS класс */
  className?: string;
  /** Inline стили */
  style?: React.CSSProperties;
}