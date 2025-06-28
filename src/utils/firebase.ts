import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { FIREBASE_CONFIG } from "@/constants";

// Debug logging
console.log("Firebase Config:", FIREBASE_CONFIG);

// Initialize Firebase
const app = initializeApp(FIREBASE_CONFIG);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Authentication functions
export const signInWithGoogle = async () => {
  try {
    console.log("Attempting Google sign-in...");
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Sign-in successful:", result.user.email);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    console.log("Signing out...");
    await signOut(auth);
    console.log("Sign-out successful");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Auth state observer
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  console.log("Setting up auth state observer...");
  return onAuthStateChanged(auth, (user) => {
    console.log("Auth state changed:", user?.email || "No user");
    callback(user);
  });
};

export default app;
