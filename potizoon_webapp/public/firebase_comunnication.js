// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";



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
const database = firebase.database();
