import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDo9in_JIAZM8L9Jn0Z_fFQ8pZ7s9hIwZg",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "market-chain-5bd35.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://market-chain-5bd35-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "market-chain-5bd35",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "market-chain-5bd35.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "843550623148",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:843550623148:web:d82dfa2f71c8368f1a2609",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-YDSTJ84L01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimeDb = getDatabase(app);
export const storage = getStorage(app);

export default app; 