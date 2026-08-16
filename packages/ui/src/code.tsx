import React from 'react';
import { useUI } from './context';
import type { CodeProps } from './types';

export const Code: React.FC<CodeProps> = (props) => {
  const ui = useUI();
  const C = ui.Code;
  return <C {...props} />;
};
