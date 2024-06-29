//import firebase from 'firebase/app';
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: 'AIzaSyCF5ZTxU2izIKvqUkVKSjILufVMm6545oo',
  authDomain: 'event-management-system-fed0c.firebaseapp.com',
  projectId: 'event-management-system-fed0c',
  storageBucket: 'event-management-system-fed0c.appspot.com',
  messagingSenderId: '378030448237',
  appId: '1:378030448237:web:c5bd108c35618e63e9e964',
  measurementId: 'G-L46MQETGMK'
};
console.log({firebaseConfig})

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, googleProvider, facebookProvider, db, storage };
// export default firebase;
