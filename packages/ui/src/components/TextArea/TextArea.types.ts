import type { ReactNode, ChangeEvent, FocusEvent } from 'react';

export type TextAreaSize = 'small' | 'medium' | 'large';
export type TextAreaStatus = 'default' | 'error' | 'warning' | 'success';

export interface TextAreaProps {
  value?: string;
  defaultValue?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  size?: TextAreaSize;
  status?: TextAreaStatus;
  disabled?: boolean;
  readOnly?: boolean;
  allowClear?: boolean;
  maxLength?: number;
  rows?: number;
  autoSize?: boolean | { minRows: number; maxRows: number };
  showCount?: boolean;
  className?: string;
}