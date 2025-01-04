'use client';

import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/core/config/store';
import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </ThemeProvider>
  );
} 