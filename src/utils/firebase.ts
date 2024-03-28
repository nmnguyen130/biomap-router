import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";
import { collection, getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDOHk4946gjFnnTAEQFrwOrkgjx2LYNB8Q",
  authDomain: "biomap-app.firebaseapp.com",
  projectId: "biomap-app",
  storageBucket: "biomap-app.appspot.com",
  messagingSenderId: "507593141217",
  appId: "1:507593141217:web:37dbae72f7606e27a940a0",
  measurementId: "G-H6FEQRLK38",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const db = getFirestore(app);
export const provinceRef = collection(db, "Provinces");
