import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_SECRET_KEY,

	authDomain: `${process.env.REACT_APP_DOMAIN}.firebaseapp.com`,

	projectId: process.env.REACT_APP_DOMAIN,

	storageBucket: `${process.env.REACT_APP_DOMAIN}.appspot.com`,

	messagingSenderId: "989076242971",

	appId: "1:989076242971:web:46c35acf134d273bfe6ebe",

	measurementId: "G-W546B49R7F",
};

initializeApp(firebaseConfig);
export const db = getFirestore();
