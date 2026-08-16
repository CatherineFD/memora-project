import React from 'react';

export type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: (event?: React.MouseEvent) => void;
};

export type CardProps = {
  className?: string;
  title: string;
  children: React.ReactNode;
  href?: string;
};

export type CodeProps = {
  children: React.ReactNode;
  className?: string;
};
