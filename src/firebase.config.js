// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcFT74Q_oVqPsBDxFKrhwRRZm2IrNleIw",
  authDomain: "taskproject-b7e40.firebaseapp.com",
  projectId: "taskproject-b7e40",
  storageBucket: "taskproject-b7e40.appspot.com",
  messagingSenderId: "38104050126",
  appId: "1:38104050126:web:e3e2fb44be48376e41a39f"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app