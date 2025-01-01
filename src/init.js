// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCi85Mp9GH95-0F50H_ftKaCmCoaDHzGjo",
  authDomain: "test-contacts-12d73.firebaseapp.com",
  projectId: "test-contacts-12d73",
  storageBucket: "test-contacts-12d73.firebasestorage.app",
  messagingSenderId: "729314653570",
  appId: "1:729314653570:web:1eb455cf4b71cdd81d8b9b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
