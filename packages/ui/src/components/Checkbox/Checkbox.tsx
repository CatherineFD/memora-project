import { Checkbox as AntdCheckbox, CheckboxChangeEvent } from 'antd';
import type { CheckboxProps } from './Checkbox.types.js';

export const Checkbox = ({
  children,
  checked,
  defaultChecked,
  disabled = false,
  indeterminate = false,
  onChange,
  ...rest
}: CheckboxProps) => {
  
  // Адаптируем событие antd в наш универсальный формат
  const handleAntdChange = (e: CheckboxChangeEvent) => {
    onChange?.(e.target.checked);
  };

  return (
    <AntdCheckbox
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      indeterminate={indeterminate}
      onChange={handleAntdChange}
      {...rest}
    >
      {children}
    </AntdCheckbox>
  );
};