import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_DOMAIN}`,
  projectId: "react-auth-chatroom",
  storageBucket: "react-auth-chatroom.appspot.com",
  messagingSenderId: "612273019960",
  appId: "1:612273019960:web:c8b9637e8a149c04f31acd",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
