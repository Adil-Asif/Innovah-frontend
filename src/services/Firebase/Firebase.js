// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD39GhREy53z8CZbb3gaMSgXU3MEvFTwsQ",
  authDomain: "innovah-f25e4.firebaseapp.com",
  projectId: "innovah-f25e4",
  storageBucket: "innovah-f25e4.appspot.com",
  messagingSenderId: "1056092694132",
  appId: "1:1056092694132:web:2e70703f9bb0a0c8b79321",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
