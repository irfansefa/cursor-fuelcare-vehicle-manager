'use client';

import { ReactNode } from 'react';

export interface NavigationProps {
  children: ReactNode;
}

export function Navigation({ children }: NavigationProps) {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-sm">
      {children}
    </nav>
  );
} 