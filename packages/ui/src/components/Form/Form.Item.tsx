import { Form as AntdForm } from 'antd';
import type { FormItemProps } from './Form.types';

export const FormItem = ({
  children,
  name,
  label,
  required,
  rules,
  help,
  ...rest
}: FormItemProps) => {
  // Конвертируем наши правила в antd правила
  const antdRules = rules?.map((rule) => ({
    ...rule,
    validator: rule.validator
      ? (_: any, value: any) => {
          const result = rule.validator!(value);
          if (result === true) return Promise.resolve();
          if (typeof result === 'string') return Promise.reject(new Error(result));
          return Promise.reject(new Error(rule.message || 'Validation failed'));
        }
      : undefined,
  }));

  return (
    <AntdForm.Item
      name={name}
      label={label}
      rules={antdRules}
      required={required}
      help={help}
      {...rest}
    >
      {children}
    </AntdForm.Item>
  );
};