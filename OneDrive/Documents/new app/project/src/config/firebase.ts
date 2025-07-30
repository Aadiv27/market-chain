import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDo9in_JIAZM8L9Jn0Z_fFQ8pZ7s9hIwZg",
  authDomain: "market-chain-5bd35.firebaseapp.com",
  databaseURL: "https://market-chain-5bd35-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "market-chain-5bd35",
  storageBucket: "market-chain-5bd35.firebasestorage.app",
  messagingSenderId: "843550623148",
  appId: "1:843550623148:web:d82dfa2f71c8368f1a2609",
  measurementId: "G-YDSTJ84L01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimeDb = getDatabase(app);
export const storage = getStorage(app);

export default app; 