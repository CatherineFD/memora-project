import React, { createContext, useContext } from 'react';
import type { ButtonProps, CardProps, CodeProps } from './types';

export type UIImpl = {
  Button: React.ComponentType<ButtonProps>;
  Card: React.ComponentType<CardProps>;
  Code: React.ComponentType<CodeProps>;
};

// UIContext allows consumers (or host app) to override the implementation.
const UIContext = createContext<UIImpl | null>(null);

export const UiProvider: React.FC<{ impl: UIImpl; children?: React.ReactNode }> = ({ impl, children }) => {
  return <UIContext.Provider value={impl}>{children}</UIContext.Provider>;
};

export const useUI = (): UIImpl => {
  const ctx = useContext(UIContext);
  if (ctx) return ctx;

  // Fallback to the library's default implementation (antd). Use require to avoid
  // forcing a build-time dependency cycle for consumers that provide their own impl.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { defaultImpl } = require('./antd-impl');
  return defaultImpl as UIImpl;
};
