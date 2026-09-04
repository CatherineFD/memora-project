import { Tabs as AntdTabs } from 'antd';
import type { TabsProps } from './Tabs.types';

export const Tabs = ({
  activeKey,
  defaultActiveKey,
  items,
  type = 'line',
  size = 'medium',
  onChange,
  onEdit,
  hideAdd = false,
  centered = false,
  className,
  style,
}: TabsProps) => {
  const antdSize = mapSizeToAntdSize(size);
  
  // Для onEdit antd ожидает (targetKey, action) => void
  const handleEdit = onEdit
    ? (targetKey: string | React.MouseEvent | React.KeyboardEvent, action: 'add' | 'remove') => {
        if (typeof targetKey === 'string') {
          onEdit(targetKey, action);
        }
      }
    : undefined;

  return (
    <AntdTabs
      activeKey={activeKey}
      defaultActiveKey={defaultActiveKey}
      items={items}
      type={type}
      size={antdSize}
      onChange={onChange}
      onEdit={handleEdit}
      hideAdd={hideAdd}
      centered={centered}
      className={className}
      style={style}
    />
  );
};

const mapSizeToAntdSize = (size: TabsProps['size']) => {
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