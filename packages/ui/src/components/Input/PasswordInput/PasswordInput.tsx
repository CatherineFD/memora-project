// packages/ui/src/components/Input/PasswordInput.tsx
import { Input as AntdInput } from 'antd';
import type { ComponentProps } from 'react';
import type { PasswordInputProps } from './PasswordInput.types';

const { Password: AntdPassword } = AntdInput;

type AntdPasswordProps = ComponentProps<typeof AntdPassword>;

export const PasswordInput = ({
  value,
  defaultValue,
  placeholder,
  size = 'medium',
  variant = 'outlined',
  status = 'default',
  disabled = false,
  allowClear = false,
  maxLength,
  visibilityToggle = true,
  iconRender,
  onChange,
  onFocus,
  onBlur,
  onPressEnter,
  className,
  style,
  id,
  name,
  autoFocus,
  autoComplete = 'current-password',
}: PasswordInputProps) => {
  const antdSize = mapSizeToAntdSize(size);
  const antdStatus = status === 'default' ? undefined : status;

  // Адаптируем onChange: antd отдаёт event, мы отдаём string
  const handleChange: AntdPasswordProps['onChange'] = (e) => {
    onChange?.(e.target.value);
  };

  return (
    <AntdPassword
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      size={antdSize}
      variant={variant}
      status={antdStatus}
      disabled={disabled}
      allowClear={allowClear}
      maxLength={maxLength}
      visibilityToggle={visibilityToggle}
      iconRender={iconRender}
      onChange={handleChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onPressEnter={onPressEnter}
      className={className}
      style={style}
      id={id}
      name={name}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
    />
  );
};

const mapSizeToAntdSize = (size: PasswordInputProps['size']) => {
  switch (size) {
    case 'small':
      return 'small';
    case 'large':
      return 'large';
    case 'medium':
    default:
      return 'middle';
  }
};