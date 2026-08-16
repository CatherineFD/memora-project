import React from 'react';
import { Button as AntButton, Card as AntCard, Typography } from 'antd';
import type { UIImpl } from './context';
import type { ButtonProps, CardProps, CodeProps } from './types';

// Note: antd styles are provided to consumers. For antd v5 use the reset.css entrypoint.
// Consumers (or host) should import 'antd/dist/reset.css' (or a custom theme) once in their app.

export const AntdButton: React.FC<ButtonProps> = ({ children, className, onClick }) => {
  return (
    <AntButton className={className} onClick={onClick}>
      {children}
    </AntButton>
  );
};

export const AntdCard: React.FC<CardProps> = ({ className, title, children, href }) => {
  return (
    <AntCard className={className} title={title}>
      <div>{children}</div>
    </AntCard>
  );
};

export const AntdCode: React.FC<CodeProps> = ({ children, className }) => {
  return (
    <Typography.Text code className={className as any}>
      {children}
    </Typography.Text>
  );
};

export const defaultImpl: UIImpl = {
  Button: AntdButton,
  Card: AntdCard,
  Code: AntdCode,
};

export default defaultImpl;
