import { Modal as AntdModal } from 'antd';
import type { ModalProps } from './Modal.types';

export const Modal = ({
  open,
  title,
  children,
  size = 'medium',
  okText = 'OK',
  cancelText = 'Отмена',
  okButtonDisabled = false,
  okButtonLoading = false,
  onOk,
  onCancel,
  footer,
  hideFooter = false,
  maskClosable = true,
  keyboard = true,
  closable = true,
  className,
  style,
}: ModalProps) => {
  const antdWidth = mapSizeToAntdWidth(size);
  
  // Если hideFooter=true, передаём null в footer
  const antdFooter = hideFooter ? null : footer;

  return (
    <AntdModal
      open={open}
      title={title}
      width={antdWidth}
      okText={okText}
      cancelText={cancelText}
      okButtonProps={{ disabled: okButtonDisabled, loading: okButtonLoading }}
      onOk={onOk}
      onCancel={onCancel}
      footer={antdFooter}
      maskClosable={maskClosable}
      keyboard={keyboard}
      closable={closable}
      className={className}
      style={style}
    >
      {children}
    </AntdModal>
  );
};

const mapSizeToAntdWidth = (size: ModalProps['size']) => {
  switch (size) {
    case 'small':
      return 400;
    case 'large':
      return 800;
    case 'medium':
    default:
      return 520;
  }
};