import { Tag as AntdTag } from 'antd';
import type { TagProps } from './Tag.types';

export const Tag = ({
  children,
  variant = 'default',
  color,
  icon,
  closable = false,
  onClose,
  className,
  style,
}: TagProps) => {
  const antdColor = color || mapVariantToAntdColor(variant);

  return (
    <AntdTag
      color={antdColor}
      icon={icon}
      closable={closable}
      onClose={handleClose}
      className={className}
      style={style}
    >
      {children}
    </AntdTag>
  );

  function handleClose() {
    onClose?.();
  }
};

const mapVariantToAntdColor = (variant: TagProps['variant']) => {
  switch (variant) {
    case 'primary':
      return 'blue';
    case 'success':
      return 'green';
    case 'warning':
      return 'orange';
    case 'error':
      return 'red';
    case 'info':
      return 'cyan';
    case 'default':
    default:
      return undefined;
  }
};