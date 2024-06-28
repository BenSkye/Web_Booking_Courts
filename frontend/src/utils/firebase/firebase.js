
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-a3b16.firebaseapp.com",
  projectId: "mern-estate-a3b16",
  storageBucket: "mern-estate-a3b16.appspot.com",
  messagingSenderId: "341790173154",
  appId: "1:341790173154:web:058f4f40c94321967bfbbb",
  measurementId: "G-D5K998MW75"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);