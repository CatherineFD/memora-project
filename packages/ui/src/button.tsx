"use client";

import React from 'react';
import { useUI } from './context';
import type { ButtonProps } from './types';

export const Button: React.FC<ButtonProps> = (props) => {
  const ui = useUI();
  const C = ui.Button;
  return <C {...props} />;
};
