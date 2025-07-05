import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { signInWithGoogle, signOutUser, onAuthStateChange } from '@/shared/lib';

export interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthorizedForGo: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    isAuthorizedForGo: false,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      // Authorization is now checked by the backend
      // Frontend assumes any authenticated user can try to access Go
      const isAuthorizedForGo = !!user;

      setAuthState({
        user,
        loading: false,
        isAuthorizedForGo,
      });
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  return {
    ...authState,
    login,
    logout,
  };
};
