// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2b2LmxGpXXOW4zI2tfz-22I2AViLKjMQ",
  authDomain: "module-fifty-nine.firebaseapp.com",
  projectId: "module-fifty-nine",
  storageBucket: "module-fifty-nine.appspot.com",
  messagingSenderId: "646497462976",
  appId: "1:646497462976:web:e59b22b0af983d6511db25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app