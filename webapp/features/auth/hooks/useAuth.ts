'use client';

import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { setCredentials, setError, setLoading, logout as logoutAction } from "../store/authSlice";
import type { RootState } from "@/store/store";
import { supabase } from "../services/auth-service";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
  fullName: string;
  username?: string;
  avatarUrl?: string;
}

export function useAuth() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(""));

        const { data, error } = await supabase.auth.signInWithPassword(credentials);
        if (error) throw error;
        if (!data.user || !data.session) throw new Error('Authentication failed');

        dispatch(setCredentials({
          user: {
            id: data.user.id,
            email: data.user.email!,
            fullName: data.user.user_metadata.full_name || null,
            avatarUrl: data.user.user_metadata.avatar_url || null,
          },
          token: data.session.access_token
        }));
      } catch (err) {
        dispatch(setError((err as Error).message));
        throw err;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const register = useCallback(
    async (credentials: RegisterCredentials) => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(""));

        const { error } = await supabase.auth.signUp({
          email: credentials.email,
          password: credentials.password,
          options: {
            data: {
              full_name: credentials.fullName,
              avatar_url: credentials.avatarUrl,
            }
          }
        });
        if (error) throw error;

        dispatch(setError("Registration successful! Please check your email to confirm your account."));
      } catch (err) {
        dispatch(setError((err as Error).message));
        throw err;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const logout = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      dispatch(logoutAction());
    } catch (err) {
      console.error('Logout failed:', err);
    }
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
  };
} 