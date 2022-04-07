// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBhgy7j3fb7U8H2NVPe9R0zS7OrhxzmF9s",
    authDomain: "react-app-course-37df1.firebaseapp.com",
    projectId: "react-app-course-37df1",
    storageBucket: "react-app-course-37df1.appspot.com",
    messagingSenderId: "1073035572858",
    appId: "1:1073035572858:web:2a1ee143058bf33aae6dc3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {
    db,
    googleAuthProvider,
    firebase
}