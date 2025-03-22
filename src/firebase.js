import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDw5TrfFXdpaWRS7TqSFmScFZQwCN4ZUec",
  authDomain: "system-9aba9.firebaseapp.com",
  projectId: "system-9aba9",
  storageBucket: "system-9aba9.appspot.com",
  messagingSenderId: "920738019555",
  appId: "1:920738019555:web:8cf02a5a3ace9f736a6dd6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
