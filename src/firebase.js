// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_-c2862VnIcx433dpNDxgL2MAu--x0P0",
    authDomain: "polimaps-e0759.firebaseapp.com",
    projectId: "polimaps-e0759",
    storageBucket: "polimaps-e0759.firebasestorage.app",
    messagingSenderId: "642772750066",
    appId: "1:642772750066:web:3ed765c99cff42a5200a6b"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export const authFirebase = getAuth(appFirebase);
export const dbFirebase = getFirestore(appFirebase);

export default appFirebase;