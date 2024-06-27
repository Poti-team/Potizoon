import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYQpefxLwh79yaxZs11r6EeedO5lDPAoA",
  authDomain: "potizoon.firebaseapp.com",
  databaseURL: "https://potizoon-default-rtdb.firebaseio.com",
  projectId: "potizoon",
  storageBucket: "potizoon.appspot.com",
  messagingSenderId: "352972018903",
  appId: "1:352972018903:web:29ba20e8b4fbe054564c92",
  measurementId: "G-WX4H4L1F6W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
auth.languageCode = 'it';

export default app;