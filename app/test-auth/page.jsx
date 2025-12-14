"use client";
import { useState } from "react";
import { auth } from "../lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function TestAuth() {
  const [message, setMessage] = useState("");

  const testSignIn = async () => {
    setMessage("Testing Firebase...");
    
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    setMessage(`Success! User: ${result.user.email}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Firebase Auth Test</h1>
      <button 
        onClick={testSignIn}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Test Google Sign In
      </button>
      <p className="mt-4">{message}</p>
    </div>
  );
}