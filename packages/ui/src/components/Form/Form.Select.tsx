import { Form as AntdForm, Select } from 'antd';
import type { FormSelectProps } from './Form.types';

export const FormSelect = ({
  name,
  label,
  options,
  placeholder,
  required,
  rules,
  disabled,
  multiple,
}: FormSelectProps) => {
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
    >
      <Select
        options={options}
        placeholder={placeholder}
        disabled={disabled}
        mode={multiple ? 'multiple' : undefined}
      />
    </AntdForm.Item>
  );
};