import * as admin from 'firebase-admin';

import { config } from './config/config';

let internalApp: admin.app.App;
let internalDB: FirebaseFirestore.Firestore;
let internalStorage: admin.storage.Storage;
let internalAuth: admin.auth.Auth | null;

if (config.get('env') !== 'test') {
  // firebase-functions import needs to happen before admin.initializeApp() as
  // it populates the FIREBASE_CONFIG variable
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  require('firebase-functions');
  internalApp = admin.initializeApp();
  internalDB = admin.firestore();
  internalStorage = admin.storage();
  internalAuth = admin.auth();
} else {
  // Only import when we're in a test environment
  // (as dependency is only included in devDependencies)
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const firebaseTest = require('@firebase/testing');
  internalApp = firebaseTest.initializeAdminApp({ projectId: 'reach-4-help-test' });
  internalDB = internalApp.firestore();
  internalStorage = internalApp.storage();
  internalAuth = null;
}

export const app = internalApp;
export const db = internalDB;
export const storage = internalStorage;
export const auth = internalAuth;
