// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkYEH-YL0l1Ak5-tMBDxAoKLg-Zg26tZE",
  authDomain: "react-journal-app-8b375.firebaseapp.com",
  projectId: "react-journal-app-8b375",
  storageBucket: "react-journal-app-8b375.appspot.com",
  messagingSenderId: "164875529581",
  appId: "1:164875529581:web:1f4dae6ed560fcc6127e64"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth( firebaseApp );
export const firebaseDB = getFirestore( firebaseApp );
