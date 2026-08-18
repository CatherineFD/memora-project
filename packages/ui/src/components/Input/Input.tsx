import { Input as AntdInput } from 'antd';
import type { InputProps } from './Input.types';

export const Input = ({
  type = 'text',
  variant = 'outlined',
  size = 'medium',
  status = 'default',
  ...rest
}: InputProps) => {
  const antdSize = mapSizeToAntdSize(size);
  const antdStatus = status === 'default' ? undefined : status;

  if (type === 'password') {
    return (
      <AntdInput.Password
        variant={variant}
        size={antdSize}
        status={antdStatus}
        {...rest}
      />
    );
  }

  return (
    <AntdInput
      type={type}
      variant={variant}
      size={antdSize}
      status={antdStatus}
      {...rest}
    />
  );
};

const mapSizeToAntdSize = (size: InputProps['size']) => {
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