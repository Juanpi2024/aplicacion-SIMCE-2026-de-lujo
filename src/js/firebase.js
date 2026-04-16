import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHNZocs33fa9qg4g30hYydNjQEorJZJ_Y",
  authDomain: "simce-yeca-2026.firebaseapp.com",
  projectId: "simce-yeca-2026",
  storageBucket: "simce-yeca-2026.firebasestorage.app",
  messagingSenderId: "302827415854",
  appId: "1:302827415854:web:6460f635a607bc74e332bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
