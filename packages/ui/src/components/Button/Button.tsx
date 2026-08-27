import { Button as AntdButton } from 'antd';
import type { ButtonProps } from './Button.types.ts';

export const Button = ({
  children,
  variant = 'secondary',
  size = 'medium',
  htmlType = 'button',
  icon,
  block = false,
  ...rest
}: ButtonProps) => {

  const antdType = mapVariantToAntdType(variant);
  const antdDanger = variant === 'danger';
  const antdSize = mapSizeToAntdSize(size);

  return (
    <AntdButton
      type={antdType}
      danger={antdDanger}
      size={antdSize}
      htmlType={htmlType}
      icon={icon}
      block={block}
      {...rest}
    >
      {children}
    </AntdButton>
  );
};

const mapVariantToAntdType = (variant: ButtonProps['variant']) => {
  switch (variant) {
    case 'primary':
    case 'danger':
      return 'primary';
    case 'ghost':
      return 'default';
    case 'secondary':
    default:
      return 'default';
  }
};

const mapSizeToAntdSize = (size: ButtonProps['size']) => {
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