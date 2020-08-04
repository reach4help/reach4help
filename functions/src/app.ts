import * as admin from 'firebase-admin';

import { config } from './config/config';

let internalApp: admin.app.App;
let internalDB: FirebaseFirestore.Firestore;
let internalAuth: admin.auth.Auth | null;
let internalMessaging;
let internalFieldIncrementer;

if (config.get('env') !== 'test') {
  // firebase-functions import needs to happen before admin.initializeApp() as
  // it populates the FIREBASE_CONFIG variable
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  require('firebase-functions');
  internalApp = admin.initializeApp();
  internalDB = admin.firestore();
  internalAuth = admin.auth();
  internalMessaging = internalApp.messaging();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  internalFieldIncrementer = admin.firestore.FieldValue.increment;
} else {
  // Only import when we're in a test environment
  // (as dependency is only included in devDependencies)
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const firebaseTest = require('@firebase/testing');
  internalApp = firebaseTest.initializeAdminApp({ projectId: 'reach-4-help-test' });
  internalDB = internalApp.firestore();
  internalAuth = null;
  internalMessaging = {
    send: () => Promise.resolve('randomID'),
  };
  internalFieldIncrementer = firebaseTest.firestore.FieldValue.increment;
}

export const app = internalApp;
export const db = internalDB;
export const auth = internalAuth;
export const messaging = internalMessaging;
export const fieldIncrementer = internalFieldIncrementer;
