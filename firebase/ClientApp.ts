import {initializeApp} from "firebase/app";
import firebase from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';
import type { Firestore } from '@firebase/firestore';
import {getFirestore} from "firebase/firestore";
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
  const firestore = getFirestore();
  // const collectionRef = firestore.collection('spotlight1');
  // collectionRef.doc('OnqT2fzVBjZM48SoxbDM').update({
  //   "angel(deg)": 40,
  // });
export default firestore;