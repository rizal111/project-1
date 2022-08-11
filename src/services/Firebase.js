// import { app } from "firebase-admin";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_SECRET_KEY,

  authDomain: `${process.env.REACT_APP_DOMAIN}.firebaseapp.com`,

  projectId: process.env.REACT_APP_DOMAIN,

  storageBucket: `${process.env.REACT_APP_DOMAIN}.appspot.com`,

  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,

  appId: process.env.REACT_APP_FIREBASE_APPID,

  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

initializeApp(firebaseConfig);
export const db = getFirestore();
