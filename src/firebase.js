// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBhCk3d5alFSM8BNzfARKkn8vZTiHXunxU",
    authDomain: "la-casa-de-las-telas.firebaseapp.com",
    projectId: "la-casa-de-las-telas",
    storageBucket: "la-casa-de-las-telas.firebasestorage.app",
    messagingSenderId: "843465659908",
    appId: "1:843465659908:web:e9ba61bb0bd27462a7c751",
    measurementId: "G-YGCVE8LQQT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);