import { initializeApp } from "firebase/app";
import { ProviderId, getAuth } from "firebase/auth"
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult, OAuthCredential } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, CollectionReference, collection, DocumentReference } from 'firebase/firestore';
import { getDatabase, ref, get} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAIYNIn4VOdC8XXqnTWywz4OO7qu3a_Kyk",
  authDomain: "potizoon2.web.app",
  databaseURL: "https://potizoon2-default-rtdb.firebaseio.com",
  projectId: "potizoon2",
  storageBucket: "potizoon2.appspot.com",
  messagingSenderId: "119121759742",
  appId: "1:119121759742:web:2760bdd8f21beff7f8c4af"
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






//works
export const createDocument = async (document_name:string, collection:any, document_data:object) => {
  const docRef = doc(db, collection, document_name);

  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    try {
      await setDoc(docRef, document_data);
    } catch (error: any) {
      console.log('Error creating document' + document_name + "with data" + document_data, error.message, error.code, error.stack);
      console.error('Error creating document' + document_name + "with data" + document_data, error.message);
    }
  }
  return docRef; 
}


export const updateUserMapSearchHistory = async (user_id: string, map_search_history: Array<Object>) => {
  if (!user_id) {
    console.error('Invalid user ID provided for updating map search history');
    return;
  }
  const docRef = doc(db, 'users', user_id);
  try {
    await setDoc(docRef, { map_search_history: map_search_history }, { merge: true });
  } catch (error: any) {
    console.log('Error updating user map search history', error.message, error.code, error.stack);
    console.error('Error updating user map search history', error.message);
  }
}

export const getUserMapSearchHistory = async (user_id: string) => {
  if (!user_id) {
    console.error('Invalid user ID provided for fetching map search history');
    return null;
  }
  const docRef = doc(db, 'users', user_id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().map_search_history;
  }
  return null;
}