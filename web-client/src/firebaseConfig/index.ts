/* eslint-disable import/no-duplicates */

import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/analytics';
import 'firebase/performance';
import 'firebase/storage';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  useEmulator: process.env.USE_EMULATOR,
};

firebase.initializeApp(config);
console.log('debug 2', config.useEmulator, config.apiKey);
if (config.useEmulator === 'Y') {
  console.log('Using emulator');
  firebase.functions().useEmulator('host', 5001);
}

export const firebaseAuth = firebase.auth();
export const firebaseFirestore = firebase.firestore();
export const firebaseFunctions = firebase.functions();
export const firebaseAnalytics = firebase.analytics();
export const firebasePerformance = firebase.performance();
export const firebaseStorage = firebase.storage();

export default firebase;
