import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import "firebase/database";
import "firebase/auth";
const firebaseConfig = {
  //Auth
  apiKey: "AIzaSyBQHUFpp9TgatZJQJI6ADSrS0_bglhbehg",
  authDomain: "scripbox-test-b79c7.firebaseapp.com",
  //
  projectId: "scripbox-test-b79c7",
  storageBucket: "scripbox-test-b79c7.appspot.com",
  messagingSenderId: "636014869218",
  appId: "1:636014869218:web:8ac8c981e95d4f53a87cbb",
  measurementId: "G-SYP05BPYCS",
  // databaseURL:
  //   "https://scripbox-test-b79c7-default-rtdb.asia-southeast1.firebasedatabase.app/",
  databaseURL: "https://scripbox-test-b79c7-default-rtdb.firebasedatabase.app/",
};

// Initialize Firebase

const initializeFirebase = initializeApp(firebaseConfig);
var db = getFirestore();
const analytics = getAnalytics(initializeFirebase);
const database = getDatabase();

export { initializeFirebase, analytics, database, db };
