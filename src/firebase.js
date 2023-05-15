// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD42FHHrX65IuGxJMGUWpXZZE4x9kBfwdo",
  authDomain: "slack-mfd-clone.firebaseapp.com",
  projectId: "slack-mfd-clone",
  storageBucket: "slack-mfd-clone.appspot.com",
  messagingSenderId: "909364053406",
  appId: "1:909364053406:web:31ea92b5ebdbe5c382c28f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
const timestamp = serverTimestamp();

export { auth, provider, db, app, timestamp };
