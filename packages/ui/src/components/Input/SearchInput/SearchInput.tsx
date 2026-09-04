import { Input as AntdInput } from 'antd';
import type { ComponentProps } from 'react';
import type { SearchInputProps } from './SearchInput.types';

const { Search: AntdSearch } = AntdInput;

type AntdSearchProps = ComponentProps<typeof AntdSearch>;

export const SearchInput = ({
  value,
  defaultValue,
  placeholder,
  size = 'medium',
  variant = 'outlined',
  status = 'default',
  disabled = false,
  loading = false,
  allowClear = true,
  maxLength,
  enterButton,
  showSearchButtonOnFocus = false,
  onChange,
  onSearch,
  onFocus,
  onBlur,
  onPressEnter,
  className,
  style,
  id,
  name,
  autoFocus,
}: SearchInputProps) => {
  const antdSize = mapSizeToAntdSize(size);
  const antdStatus = status === 'default' ? undefined : status;

  // Адаптируем onChange: antd отдаёт event, мы отдаём string
  const handleChange: AntdSearchProps['onChange'] = (e) => {
    onChange?.(e.target.value);
  };

  // Адаптируем onSearch: antd отдаёт (value, event), мы отдаём только value
  const handleSearch: AntdSearchProps['onSearch'] = (searchValue) => {
    onSearch?.(searchValue);
  };

  return (
    <AntdSearch
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      size={antdSize}
      variant={variant}
      status={antdStatus}
      disabled={disabled}
      loading={loading}
      allowClear={allowClear}
      maxLength={maxLength}
      enterButton={enterButton}
      // @ts-expect-error showSearchButtonOnFocus is not in antd types but works
      showSearchButtonOnFocus={showSearchButtonOnFocus}
      onChange={handleChange}
      onSearch={handleSearch}
      onFocus={onFocus}
      onBlur={onBlur}
      onPressEnter={onPressEnter}
      className={className}
      style={style}
      id={id}
      name={name}
      autoFocus={autoFocus}
    />
  );
};

const mapSizeToAntdSize = (size: SearchInputProps['size']) => {
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