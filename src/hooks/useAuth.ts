import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import {
  signInWithGoogle,
  signOutUser,
  onAuthStateChange,
} from "@/utils/firebase";
import { AUTHORIZED_GO_USERS } from "@/constants";

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
      const isAuthorizedForGo = user
        ? AUTHORIZED_GO_USERS.includes(user.email || "")
        : false;

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
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  return {
    ...authState,
    login,
    logout,
  };
};
