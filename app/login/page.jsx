/*
 * Login page component for BiteBuddy.
 * Allows users to sign in with Google authentication.
 */
"use client";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { user, signInWithGoogle, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🍔</div>
          <h1 className="text-4xl font-bold text-green-600 mb-2">BiteBuddy</h1>
          <p className="text-gray-600">Share food with your community</p>
        </div>

        <button onClick={signInWithGoogle}
            className="w-full bg-white border-2 border-gray-300
             text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition flex 
             items-center justify-center gap-3 font-semibold">
            <img
              src="/google-logo.jpg"
              alt="Google logo"
              className="w-6 h-6"
            />
            Sign in with Google
          </button>


        <div className="mt-8 text-center text-sm text-gray-600">
          <p>By signing in, you agree to share food with your community</p>
        </div>
      </div>
    </div>
  );
}