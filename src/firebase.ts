import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCBST7d3RsSCgFrs5vx9gXOylLYnVKq34c",
  authDomain: "iftar-manager.firebaseapp.com",
  projectId: "iftar-manager",
  storageBucket: "iftar-manager.firebasestorage.app",
  messagingSenderId: "794795772835",
  appId: "1:794795772835:web:011f53db450c6fd856e816",
  measurementId: "G-51CH1KNKW6"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
