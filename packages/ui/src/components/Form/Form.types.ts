import type { ReactNode } from 'react';

export type FormLayout = 'horizontal' | 'vertical' | 'inline';
export type FormSize = 'small' | 'medium' | 'large';

export interface FormProps {
  children: ReactNode;
  onSubmit?: (values: Record<string, any>) => void;
  onValuesChange?: (changedValues: any, allValues: any) => void;
  initialValues?: Record<string, any>;
  layout?: FormLayout;
  size?: FormSize;
  disabled?: boolean;
  className?: string;
}

export interface FormItemProps {
  children: ReactNode;
  name?: string;
  label?: ReactNode;
  required?: boolean;
  rules?: FormRule[];
  help?: ReactNode;
  className?: string;
}

export interface FormRule {
  required?: boolean;
  message?: string;
  pattern?: RegExp;
  min?: number;
  max?: number;
  validator?: (value: any) => boolean | string;
}

export interface FormDropdownProps {
  name: string;
  label?: ReactNode;
  options: Array<{ label: string; value: string | number }>;
  placeholder?: string;
  required?: boolean;
  rules?: FormRule[];
  disabled?: boolean;
  multiple?: boolean;
}

export interface FormInputProps {
  name: string;
  label?: ReactNode;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  required?: boolean;
  rules?: FormRule[];
  disabled?: boolean;
}

export interface FormSelectProps {
  name: string;
  label?: ReactNode;
  options: Array<{ label: string; value: string | number }>;
  placeholder?: string;
  required?: boolean;
  rules?: FormRule[];
  disabled?: boolean;
  multiple?: boolean;
}

export interface FormButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  htmlType?: 'submit' | 'button' | 'reset';
  loading?: boolean;
  disabled?: boolean;
  block?: boolean;
}