// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase productns that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkLaQn8NpB1gHMQ5JzrUFNsBPsFSChU_U",
  authDomain: "observe-rn.firebaseapp.com",
  projectId: "observe-rn",
  storageBucket: "observe-rn.appspot.com",
  messagingSenderId: "57173062276",
  appId: "1:57173062276:web:0933fc878d73be1a1748d1",
  measurementId: "G-WK8H808DMJ",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
// const analytics = getAnalytics(app);
// const auth = authentication();

export { auth, app, db, storage };
