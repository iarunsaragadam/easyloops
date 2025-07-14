'use client';
import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import {
  selectUser,
  selectIsAuthenticated,
  selectIsAuthorizedForGo,
  selectAuthLoading,
  selectAuthError,
  loginWithGoogle,
  logoutUser,
  setUser,
  clearError,
} from '@/store/slices/authSlice';
import { onAuthStateChange } from '@/shared/lib';

interface AuthContextType {
  // State
  user: ReturnType<typeof selectUser>;
  isAuthenticated: ReturnType<typeof selectIsAuthenticated>;
  isAuthorizedForGo: ReturnType<typeof selectIsAuthorizedForGo>;
  loading: ReturnType<typeof selectAuthLoading>;
  error: ReturnType<typeof selectAuthError>;

  // Actions
  login: () => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();

  // Selectors
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAuthorizedForGo = useSelector(selectIsAuthorizedForGo);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  // Actions
  const login = useCallback(async () => {
    try {
      await dispatch(loginWithGoogle()).unwrap();
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }, [dispatch]);

  const logout = useCallback(async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }, [dispatch]);

  const clearErrorAction = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Sync with Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      dispatch(setUser(user));
    });

    return () => unsubscribe();
  }, [dispatch]);

  const contextValue: AuthContextType = {
    // State
    user,
    isAuthenticated,
    isAuthorizedForGo,
    loading,
    error,

    // Actions
    login,
    logout,
    clearError: clearErrorAction,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
