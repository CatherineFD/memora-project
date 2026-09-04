import { Row as AntdRow } from 'antd';
import type { GridRowProps } from './Grid.types';

export const GridRow = ({
  children,
  align = 'top',
  justify = 'start',
  gutter = 0,
  wrap = true,
  className,
  style,
  id,
}: GridRowProps) => {
  const antdAlign = mapAlignToAntdAlign(align);
  const antdJustify = mapJustifyToAntdJustify(justify);

  return (
    <AntdRow
      align={antdAlign}
      justify={antdJustify}
      gutter={gutter}
      wrap={wrap}
      className={className}
      style={style}
      id={id}
    >
      {children}
    </AntdRow>
  );
};

const mapAlignToAntdAlign = (align: GridRowProps['align']) => {
  switch (align) {
    case 'top':
      return 'top';
    case 'middle':
      return 'middle';
    case 'bottom':
      return 'bottom';
    case 'stretch':
      return 'stretch';
    default:
      return 'top';
  }
};

const mapJustifyToAntdJustify = (justify: GridRowProps['justify']) => {
  switch (justify) {
    case 'start':
      return 'start';
    case 'end':
      return 'end';
    case 'center':
      return 'center';
    case 'space-around':
      return 'space-around';
    case 'space-between':
      return 'space-between';
    case 'space-evenly':
      return 'space-evenly';
    default:
      return 'start';
  }
};