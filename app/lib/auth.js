/*
 * Authentication utilities for BiteBuddy.
 * Handles Google sign-in and sign-out operations using Firebase Auth.
 */
import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";

const provider = new GoogleAuthProvider();

let isPopupOpen = false;

export const signInWithGoogle = () => {
  if (isPopupOpen) return;

  isPopupOpen = true;

  signInWithPopup(auth, provider)
    .finally(() => {
      isPopupOpen = false;
    });
};

export const signOut = async () => {
  await firebaseSignOut(auth);
};