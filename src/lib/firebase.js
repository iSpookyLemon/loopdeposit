// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCghJKesESMLev8c5oh1eFUDDUjq37n9Uk",
  authDomain: "loopdeposit.firebaseapp.com",
  projectId: "loopdeposit",
  storageBucket: "loopdeposit.appspot.com",
  messagingSenderId: "716425755843",
  appId: "1:716425755843:web:0a3102d1b1413eda46b676",
  measurementId: "G-544HG8DXCS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

const analytics = getAnalytics(app);