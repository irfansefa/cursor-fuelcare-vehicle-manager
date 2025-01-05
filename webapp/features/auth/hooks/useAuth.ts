'use client';

import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { setCredentials, setError, setLoading, logout } from "../store/authSlice";
import type { RootState } from "@/store/store";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
  fullName: string;
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

        // TODO: Replace with actual API call when ready
        const response = await mockLoginApi(credentials);
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

        // TODO: Replace with actual API call when ready
        const response = await mockRegisterApi(credentials);
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

  const logoutUser = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout: logoutUser,
  };
}

// TODO: Remove these mocks when real API is ready
async function mockLoginApi(credentials: LoginCredentials) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (credentials.email === "test@example.com" && credentials.password === "password123") {
    return {
      user: {
        id: "1",
        email: credentials.email,
        fullName: "Test User",
      },
      token: "mock-jwt-token",
    };
  }

  throw new Error("Invalid credentials");
}

async function mockRegisterApi(credentials: RegisterCredentials) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate email already exists check
  if (credentials.email === "test@example.com") {
    throw new Error("Email already exists");
  }

  return {
    user: {
      id: Math.random().toString(36).substring(7),
      email: credentials.email,
      fullName: credentials.fullName,
    },
    token: "mock-jwt-token",
  };
} 