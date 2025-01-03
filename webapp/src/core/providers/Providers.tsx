'use client';

import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/core/config/store';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
} 