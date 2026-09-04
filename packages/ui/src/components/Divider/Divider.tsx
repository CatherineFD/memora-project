import { Divider as AntdDivider } from 'antd';
import type { DividerProps } from './Divider.types';

export const Divider = ({
  children,
  variant = 'solid',
  dashed = false,
  plain = false,
  orientation = 'horizontal',
  className,
  style,
}: DividerProps) => {
  const antdType = mapVariantToAntdType(variant);

  return (
    <AntdDivider
      variant={antdType}
      dashed={dashed}
      plain={plain}
      orientation={orientation}
      className={className}
      style={style}
    >
      {children}
    </AntdDivider>
  );
};

const mapVariantToAntdType = (variant: DividerProps['variant']) => {
  switch (variant) {
    case 'dashed':
        return 'dashed';
    case 'dotted':
        return 'dotted';
    case 'solid':
    default:
      return 'solid';
  }
};