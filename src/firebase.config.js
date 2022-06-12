// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKQH-eU-OF-GpUyEPk5nkCftKNwxvYyx4",
  authDomain: "house-market-place-80235.firebaseapp.com",
  projectId: "house-market-place-80235",
  storageBucket: "house-market-place-80235.appspot.com",
  messagingSenderId: "205325501285",
  appId: "1:205325501285:web:1a7bbdb4dceef55432178c",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
