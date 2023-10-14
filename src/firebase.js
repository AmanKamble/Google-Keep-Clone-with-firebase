import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA_XjqlJak3emi6vVBL3jb4GgodStrxv5o",
  authDomain: "react-keeper-app-b9a78.firebaseapp.com",
  projectId: "react-keeper-app-b9a78",
  storageBucket: "react-keeper-app-b9a78.appspot.com",
  messagingSenderId: "526354975610",
  appId: "1:526354975610:web:fa97b73c9b4c8c99e7a4c3"
};

export const app = initializeApp(firebaseConfig);