// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCXihIFjFwAvxotmNyEuhpyTbsVw_S0c4",
  authDomain: "hackathon-810f7.firebaseapp.com",
  projectId: "hackathon-810f7",
  storageBucket: "hackathon-810f7.appspot.com",
  messagingSenderId: "779775388481",
  appId: "1:779775388481:web:c74992bfb09559558f4fc0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db