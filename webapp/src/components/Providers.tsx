'use client';

import { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store/store';
import { Toaster } from '@/components/ui/feedback/Toaster';
import { supabase } from '@/features/auth/services/auth-service';
import { setCredentials } from '@/features/auth/store/authSlice';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        store.dispatch(setCredentials({
          user: {
            id: session.user.id,
            email: session.user.email!,
            fullName: session.user.user_metadata.full_name || null,
            avatarUrl: session.user.user_metadata.avatar_url || null,
          },
          token: session.access_token
        }));
      }
    };
    
    initAuth();
  }, []);

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  );
} 