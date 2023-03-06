// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDijPEx1wt9w65UeVh7wkOPfFoj0wCnvck",
  authDomain: "cityhospital-fc209.firebaseapp.com",
  projectId: "cityhospital-fc209",
  storageBucket: "cityhospital-fc209.appspot.com",
  messagingSenderId: "1008924740004",
  appId: "1:1008924740004:web:3ee08e88643f11c0d59931",
  measurementId: "G-0RZ977C5DY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);