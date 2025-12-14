import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIOVrATeJmsRTyqYX8Eh077Xtc6i5SiZE",
  authDomain: "bitebuddy-81e45.firebaseapp.com",
  projectId: "bitebuddy-81e45",
  storageBucket: "bitebuddy-81e45.firebasestorage.app",
  messagingSenderId: "762638736946",
  appId: "1:762638736946:web:7b25a0639e0fdf8133a62b"
};

let app;
let auth;
let db;

if (typeof window !== 'undefined') {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
  db = getFirestore(app);
}

export { auth, db };
export default app;