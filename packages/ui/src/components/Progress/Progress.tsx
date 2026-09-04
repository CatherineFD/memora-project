import { Progress as AntdProgress } from 'antd';
import type { ComponentProps } from 'react';
import type { ProgressProps } from './Progress.types';

type AntdProgressProps = ComponentProps<typeof AntdProgress>;

export const Progress = ({
  percent = 0,
  variant = 'line',
  status = 'normal',
  size = 'medium',
  showInfo = true,
  steps,
  strokeColor,
  trailColor,
  strokeWidth,
  circleSize,
  format,
  className,
  style,
}: ProgressProps) => {
  const antdType = mapVariantToAntdType(variant);
  const antdSize = mapSizeToAntdSize(size);
  const antdStatus = status === 'normal' ? undefined : status;

  // Для circle/dashboard маппим size в width
  const antdWidth = variant !== 'line' ? mapSizeToCircleSize(size, circleSize) : undefined;

  return (
    <AntdProgress
      percent={percent}
      type={antdType}
      status={antdStatus}
      size={variant === 'line' ? antdSize : antdWidth}
      showInfo={showInfo}
      steps={steps}
      strokeColor={strokeColor}
      trailColor={trailColor}
      strokeWidth={strokeWidth}
      format={format as AntdProgressProps['format']}
      className={className}
      style={style}
    />
  );
};

const mapVariantToAntdType = (variant: ProgressProps['variant']) => {
  switch (variant) {
    case 'circle':
      return 'circle';
    case 'dashboard':
      return 'dashboard';
    case 'line':
    default:
      return 'line';
  }
};

const mapSizeToAntdSize = (size: ProgressProps['size']) => {
  switch (size) {
    case 'small':
      return 'small';
    case 'large':
      return 'default';
    case 'medium':
    default:
      return 'default';
  }
};

const mapSizeToCircleSize = (size: ProgressProps['size'], customSize?: number) => {
  if (customSize) return customSize;
  
  switch (size) {
    case 'small':
      return 80;
    case 'large':
      return 140;
    case 'medium':
    default:
      return 120;
  }
};