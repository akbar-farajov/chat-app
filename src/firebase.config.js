// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMMW9ciLomcw2sWSCJmBuOpHaG7wuQ9lQ",
  authDomain: "chatapp-5039a.firebaseapp.com",
  projectId: "chatapp-5039a",
  storageBucket: "chatapp-5039a.appspot.com",
  messagingSenderId: "346095192820",
  appId: "1:346095192820:web:7bbd59ce1b98c99f422ca1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
