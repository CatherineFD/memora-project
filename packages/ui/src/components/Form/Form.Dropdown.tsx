import { Form as AntdForm, Select } from 'antd';
import type { FormDropdownProps } from './Form.types';

export const FormDropdown = ({
  name,
  label,
  options,
  placeholder,
  required,
  rules,
  disabled,
  multiple,
}: FormDropdownProps) => {
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