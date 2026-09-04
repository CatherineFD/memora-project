import { Dropdown as AntdDropdown } from 'antd';
import type { DropdownProps } from './Dropdown.types';

export const Dropdown = ({
  children,
  items,
  trigger = 'hover',
  placement = 'bottomLeft',
  disabled = false,
  onOpenChange,
  onClick,
  className,
  styles,
}: DropdownProps) => {
  // Маппим trigger в массив (antd ожидает массив)
  const antdTrigger = Array.isArray(trigger) ? trigger : [trigger];
  
  // Маппим placement
  const antdPlacement = mapPlacementToAntdPlacement(placement);

  // Обработчик клика по пункту меню
  const handleMenuClick = onClick
    ? (info: { key: string }) => {
        onClick(info.key);
      }
    : undefined;

  return (
    <AntdDropdown
      menu={{
        items,
        onClick: handleMenuClick,
      }}
      trigger={antdTrigger}
      placement={antdPlacement}
      disabled={disabled}
      onOpenChange={onOpenChange}
      className={className}
      styles={styles}
    >
      {children}
    </AntdDropdown>
  );
};

const mapPlacementToAntdPlacement = (
  placement: DropdownProps['placement']
) => {
  switch (placement) {
    case 'top':
      return 'top';
    case 'topLeft':
      return 'topLeft';
    case 'topRight':
      return 'topRight';
    case 'bottom':
      return 'bottom';
    case 'bottomLeft':
      return 'bottomLeft';
    case 'bottomRight':
      return 'bottomRight';
    default:
      return 'bottomLeft';
  }
};