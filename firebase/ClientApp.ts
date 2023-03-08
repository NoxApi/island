import {initializeApp} from "firebase/app";
import firebase from "firebase/app"
import {getFirestore} from "firebase/firestore";
import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json';
declare module 'firebase/app' {
  namespace credential {
    function cert(serviceAccountPathOrObject: string | Object): Credential;
  }
}
  
  const firebaseConfig = {
    apiKey: "AIzaSyADk8Zvun0MOUaOuIc0PsFCcM5vMebcHSo",
    authDomain: "webgl-island.firebaseapp.com",
    databaseURL: "https://webgl-island-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "webgl-island",
    storageBucket: "webgl-island.appspot.com",
    messagingSenderId: "634036006228",
    appId: "1:634036006228:web:2ece82c03a118a4d266cc1",
  };
  // const credential = firebase.credential.cert(serviceAccount);
  initializeApp(firebaseConfig as any)
  // admin.initializeApp({
  //   credential: admin.credential.cert(serviceAccount as any)
  // });
  // let db = admin.firestore();
  const firestore = getFirestore();
  // const firestore = db
export default firestore;