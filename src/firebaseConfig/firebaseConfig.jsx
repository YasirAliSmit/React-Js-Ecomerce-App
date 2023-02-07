import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC57uFBw_doGlJxgrkV6_N7ivn03mZlOIU",
  authDomain: "orgeco-ba493.firebaseapp.com",
  projectId: "orgeco-ba493",
  storageBucket: "orgeco-ba493.appspot.com",
  messagingSenderId: "273845161080",
  appId: "1:273845161080:web:0e3088d76d6fc4825f718d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)