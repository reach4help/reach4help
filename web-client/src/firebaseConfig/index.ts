/* eslint-disable eqeqeq */
/* eslint-disable import/no-duplicates */

import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/analytics';
import 'firebase/performance';
import 'firebase/storage';

const useEmulator = process.env.REACT_APP_FIREBASE_USE_EMULATOR;
if (useEmulator && useEmulator == 'Y') {
  if (firebase.apps.length === 0) {
    firebase.initializeApp({
      appId: 'app',
      projectId: 'fake',
      apiKey: 'fake-emulator-api',
    });
    firebase.auth().useEmulator('http://localhost:9099/');
    firebase.firestore().useEmulator('localhost', 8080);
  } else {
    firebase.app(); // if already initialized, use that one
  }
} else {
  const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  };
  firebase.initializeApp(config);
}

export const firebaseAuth = firebase.auth();
export const firebaseFirestore = firebase.firestore();
export const firebaseFunctions = firebase.functions();
export const firebaseAnalytics = firebase.analytics();
export const firebasePerformance = firebase.performance();
export const firebaseStorage = firebase.storage();

export default firebase;
