import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDoc,
  doc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,

  authDomain: import.meta.env.VITE_authDomain,

  projectId: import.meta.env.VITE_projectId,

  storageBucket: import.meta.env.VITE_storageBucket,

  messagingSenderId: import.meta.env.VITE_messagingSenderId,

  appId: import.meta.env.VITE_appId,
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const songsCollection = collection(db, 'songs');
export const auth = getAuth(app);
export const storage = getStorage(app);

export { addDoc, setDoc, getDoc, doc };
