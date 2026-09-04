import { Alert as AntdAlert } from 'antd';
import type { AlertProps } from './Alert.types';

export const Alert = ({
  title,
  description,
  variant = 'info',
  showIcon = true,
  closable = false,
  onClose,
  icon,
  action,
  banner = false,
  className,
  style,
}: AlertProps) => {
  // Маппим наш variant в type antd
  const antdType = mapVariantToAntdType(variant);

  return (
    <AntdAlert
      message={title}
      description={description}
      type={antdType}
      showIcon={showIcon}
      closable={closable}
      onClose={onClose}
      icon={icon}
      action={action}
      banner={banner}
      className={className}
      style={style}
    />
  );
};

const mapVariantToAntdType = (variant: AlertProps['variant']) => {
  switch (variant) {
    case 'success':
      return 'success';
    case 'warning':
      return 'warning';
    case 'error':
      return 'error';
    case 'info':
    default:
      return 'info';
  }
};