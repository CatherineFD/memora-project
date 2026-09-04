import { Segmented as AntdSegmented } from 'antd';
import type { ComponentProps } from 'react';
import type { SegmentProps, SegmentValue } from './Segment.types';

type AntdSegmentedProps = ComponentProps<typeof AntdSegmented>;

export const Segment = ({
  value,
  defaultValue,
  options,
  size = 'medium',
  block = false,
  disabled = false,
  onChange,
  className,
  style,
}: SegmentProps) => {
  const antdSize = mapSizeToAntdSize(size);

  // Адаптируем onChange: antd отдаёт string | number, мы тоже отдаём SegmentValue
  const handleChange: AntdSegmentedProps['onChange'] = (val) => {
    onChange?.(val as SegmentValue);
  };

  return (
    <AntdSegmented
      value={value}
      defaultValue={defaultValue}
      options={options as AntdSegmentedProps['options']}
      size={antdSize}
      block={block}
      disabled={disabled}
      onChange={handleChange}
      className={className}
      style={style}
    />
  );
};

const mapSizeToAntdSize = (size: SegmentProps['size']) => {
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