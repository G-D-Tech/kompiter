import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCmTlUkT6YUuUz2FW5oPJ6mI05YxoLuo5E",
  authDomain: "kompiter-907ab.firebaseapp.com",
  projectId: "kompiter-907ab",
  storageBucket: "kompiter-907ab.appspot.com",
  messagingSenderId: "898063878885",
  appId: "1:898063878885:web:e73ad5f9f3664edf4fa20c",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
