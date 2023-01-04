// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//database
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5X5Nj34gn5jRDwqRIlywwpo0__W1grdk",
  authDomain: "social-app-sla.firebaseapp.com",
  projectId: "social-app-sla",
  storageBucket: "social-app-sla.appspot.com",
  messagingSenderId: "959028673802",
  appId: "1:959028673802:web:222821352a74faadc34ef3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
