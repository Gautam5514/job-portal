// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPHI_nPygcnE6EZFepCgQkIgIk8AdMDXs",
  authDomain: "aiwork-85837.firebaseapp.com",
  projectId: "aiwork-85837",
  storageBucket: "aiwork-85837.firebasestorage.app",
  messagingSenderId: "437439605894",
  appId: "1:437439605894:web:bf48ea096ccf516a02f507",
  measurementId: "G-43K5T9PE57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);