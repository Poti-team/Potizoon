import { initializeApp } from "firebase/app";
import { ProviderId, getAuth } from "firebase/auth"
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult, OAuthCredential } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDYQpefxLwh79yaxZs11r6EeedO5lDPAoA",
    authDomain: "potizoon.web.app",
    databaseURL: "https://potizoon-default-rtdb.firebaseio.com",
    projectId: "potizoon",
    storageBucket: "potizoon.appspot.com",
    messagingSenderId: "352972018903",
    appId: "1:352972018903:web:29ba20e8b4fbe054564c92",
    measurementId: "G-WX4H4L1F6W"
  };

const env = process.env.NODE_ENV
  if (env == "development") {
      firebaseConfig.authDomain = "localhost:3000";
  } else if (env == "production") {
     firebaseConfig.authDomain = "potizoon.web.app";
  }

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account' });


const auth = getAuth(firebaseApp);
auth.languageCode = 'it';
export { auth };
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, GoogleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email, photoUrl, ProviderId } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        photoUrl,
        createdAt,
        ProviderId,
      });
    } catch (error) {
      console.log('Error creating user', error.message);
      console.error('Error creating user', error.message);
    }
  }
  return userDocRef; 

}