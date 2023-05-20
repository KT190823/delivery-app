import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOnC1MTMzL5yU3kmhKphNlj-erVH6DB2Y",
  authDomain: "delivery-app-14606.firebaseapp.com",
  projectId: "delivery-app-14606",
  storageBucket: "delivery-app-14606.appspot.com",
  messagingSenderId: "1086261400506",
  appId: "1:1086261400506:web:731b1b90280909cbec4383",
  measurementId: "G-PSE0EF8P5F",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
