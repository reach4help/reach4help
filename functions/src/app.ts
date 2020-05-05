import * as admin from 'firebase-admin';

import { config } from './config/config';

let internalApp: any;
let internalDB: any;
let internalAuth: admin.auth.Auth | null;

if (config.get('env') !== 'test') {
  internalApp = admin.initializeApp();
  internalDB = admin.firestore();
  internalAuth = admin.auth();
} else {
  // Only import when we're in a test environment
  // (as dependency is only included in devDependencies)
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const firebaseTest = require('@firebase/testing');
  internalApp = firebaseTest.initializeAdminApp({ projectId: 'reach-4-help-test' });
  internalDB = internalApp.firestore();
  internalAuth = null;
}

export const app = internalApp;
export const db = internalDB;
export const auth = internalAuth;
