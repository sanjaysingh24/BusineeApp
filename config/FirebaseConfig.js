
import { initializeApp } from "firebase/app";
import { getFirestore,collection,addDoc,getDoc,doc,getDocs,updateDoc,deleteDoc  } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAXCi3p776xwfXUABblVYPckHUy90KdwEg",
  authDomain: "business-6175a.firebaseapp.com",
  projectId: "business-6175a",
  storageBucket: "business-6175a.appspot.com",
  messagingSenderId: "609015236458",
  appId: "1:609015236458:web:8ffbf04cad55b457434713",
  measurementId: "G-PHHXL8XRJS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db =getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);