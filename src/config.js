

// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app';
//import firebase from "firebase";
import "firebase/compat/database";
import "firebase/compat/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore"
import "firebase/compat/messaging"
import "firebase/compat/app-check"
//import "firebase/compat/messaging"

const config = {
  apiKey: "AIzaSyAElAm8GRef0ywGbtPVDFm0mV_2n50S0T0",
  authDomain: "cinecertified-59a1f.firebaseapp.com",
  databaseURL: "https://cinecertified-59a1f-default-rtdb.firebaseio.com",
  projectId: "cinecertified-59a1f",
  storageBucket: "cinecertified-59a1f.firebasestorage.app",
  messagingSenderId: "867403412368",
  appId: "1:867403412368:web:a9fcb821ddfbdfd9e03915",
  measurementId: "G-HJDPJXF3M7"
};

firebase.initializeApp(config);
// const db=firebase.database();
export const db = firebase.database();
export const storage = firebase.storage();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
//export const auth = firebase.auth();
//export const firestore = firebase.firestore()
//export const firebases = firebase;