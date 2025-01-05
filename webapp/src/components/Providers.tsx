'use client';

import { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store/store';
import { AuthService } from '@/features/auth/services/auth-service';
import { setCredentials } from '@/features/auth/store/authSlice';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    const initAuth = async () => {
      const session = await AuthService.getCurrentSession();
      if (session) {
        store.dispatch(setCredentials(session));
      }
    };
    
    initAuth();
  }, []);

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  );
} 