import firebase from "firebase/app";
import "firebase/auth";

// firebase config
const config = {
    apiKey: "AIzaSyB0Mlzm3JoiFIVjd0IoycUDCrX1W0owZnQ",
    authDomain: "ecom2-9e4d1.firebaseapp.com",
    projectId: "ecom2-9e4d1",
    //storageBucket: "ecom2-9e4d1.appspot.com",
    messagingSenderId: "251248374982",
    appId: "1:251248374982:web:7db824ba4b0ef06f5d53c7"
};

// initialize firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
