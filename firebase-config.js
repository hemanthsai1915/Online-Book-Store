// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyA7dEXUCJQd2SPy-4c_wrsWBbNgvS10_p4",
  authDomain: "online-book-store-7724a.firebaseapp.com",
  projectId: "online-book-store-7724a",
  storageBucket: "online-book-store-7724a.appspot.com",
  messagingSenderId: "106085247826",
  appId: "1:106085247826:web:0525b18d913db877cd288b",
  measurementId: "G-JHXSRC0VSL",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const dbf = getFirestore(app);

export {
  app,
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  dbf,
};
