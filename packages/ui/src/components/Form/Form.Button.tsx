
import { Button as AntdButton } from 'antd';
import type { FormButtonProps } from './Form.types';

export const FormButton = ({
  children,
  variant = 'primary',
  htmlType = 'submit',
  loading,
  disabled,
  block,
}: FormButtonProps) => {
  const antdType = variant === 'danger' ? 'primary' : 'default';
  const antdDanger = variant === 'danger';

  return (
    <AntdButton
      type={antdType}
      danger={antdDanger}
      htmlType={htmlType}
      loading={loading}
      disabled={disabled}
      block={block}
    >
      {children}
    </AntdButton>
  );
};