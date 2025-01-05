'use client';

import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { setCredentials, setError, setLoading, logout as logoutAction } from "../store/authSlice";
import type { RootState } from "@/store/store";
import { AuthService } from "../services/auth-service";

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

        const response = await AuthService.login(credentials);
        dispatch(setCredentials(response));
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

        await AuthService.register(credentials);
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
      await AuthService.logout();
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