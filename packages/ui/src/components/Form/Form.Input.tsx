import { Form as AntdForm, Input as AntdInput } from 'antd';
import type { FormInputProps } from './Form.types';

export const FormInput = ({
  name,
  label,
  placeholder,
  type = 'text',
  required,
  rules,
  disabled,
}: FormInputProps) => {
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

  const InputComponent = type === 'password' ? AntdInput.Password : AntdInput;

  return (
    <AntdForm.Item
      name={name}
      label={label}
      rules={antdRules}
      required={required}
    >
      <InputComponent
        type={type !== 'password' ? type : undefined}
        placeholder={placeholder}
        disabled={disabled}
      />
    </AntdForm.Item>
  );
};