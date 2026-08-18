import type { ReactNode, ChangeEvent, FocusEvent } from 'react';

export type InputVariant = 'outlined' | 'borderless' | 'filled';
export type InputSize = 'small' | 'medium' | 'large';
export type InputStatus = 'default' | 'error' | 'warning' | 'success';
export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';

export interface InputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: InputType;
  variant?: InputVariant;
  size?: InputSize;
  status?: InputStatus;
  disabled?: boolean;
  readOnly?: boolean;
  allowClear?: boolean;
  maxLength?: number;
  prefix?: ReactNode;
  suffix?: ReactNode;
  addonBefore?: ReactNode;
  addonAfter?: ReactNode;
  className?: string;
}