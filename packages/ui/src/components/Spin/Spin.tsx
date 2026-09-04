import { Spin as AntdSpin } from 'antd';
import type { SpinProps } from './Spin.types';

export const Spin = ({
  spinning = true,
  size = 'medium',
  delay,
  indicator,
  children,
  className,
  style,
}: SpinProps) => {
  const antdSize = mapSizeToAntdSize(size);

  return (
    <AntdSpin
      spinning={spinning}
      size={antdSize}
      delay={delay}
      indicator={indicator}
      className={className}
      style={style}
    >
      {children}
    </AntdSpin>
  );
};

const mapSizeToAntdSize = (size: SpinProps['size']) => {
  switch (size) {
    case 'small':
      return 'small';
    case 'large':
      return 'large';
    case 'medium':
    default:
      return 'default';
  }
};