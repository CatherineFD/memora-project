import { Col as AntdCol } from 'antd';
import type { GridColProps } from './Grid.types';

export const GridCol = ({
  children,
  span,
  offset,
  order,
  pull,
  push,
  flex,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  className,
  style,
}: GridColProps) => {
  return (
    <AntdCol
      span={span}
      offset={offset}
      order={order}
      pull={pull}
      push={push}
      flex={flex}
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
      xxl={xxl}
      className={className}
      style={style}
    >
      {children}
    </AntdCol>
  );
};