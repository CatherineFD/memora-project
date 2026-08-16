import React from 'react';
import { useUI } from './context';
import type { CardProps } from './types';

export const Card: React.FC<CardProps> = (props) => {
  const ui = useUI();
  const C = ui.Card;
  return <C {...props} />;
};
