import { Select as AntdSelect } from 'antd';
import type { ComponentProps } from 'react';
import type { SelectProps, SelectValue } from './Select.types.js';

type AntdSelectProps = ComponentProps<typeof AntdSelect>;

export const Select = ({
  value,
  defaultValue,
  options,
  multiple = false,
  disabled = false,
  loading = false,
  placeholder,
  size = 'medium',
  showSearch = false,
  allowClear = false,
  onChange,
  className,
  id,
  style,
}: SelectProps) => {
  
  // Маппинг размера
  const antdSize = mapSizeToAntdSize(size);
  
  // Маппинг режима
  const antdMode = multiple ? 'multiple' : undefined;

  // Адаптируем событие antd в наш универсальный формат
  const handleAntdChange: AntdSelectProps['onChange'] = (val) => {
    onChange?.(val as SelectValue);
  };

  return (
    <AntdSelect
      value={value}
      defaultValue={defaultValue}
      options={options}
      mode={antdMode}
      disabled={disabled}
      loading={loading}
      placeholder={placeholder}
      size={antdSize}
      showSearch={showSearch}
      allowClear={allowClear}
      onChange={handleAntdChange}
      className={className}
      id={id}
      style={style}
    />
  );
};

const mapSizeToAntdSize = (size: SelectProps['size']) => {
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