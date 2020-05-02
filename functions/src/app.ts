import * as admin from 'firebase-admin';
import * as firebaseTest from '@firebase/testing';

import { config } from './config/config';

let internalApp: any;
let internalDB: any;
let internalAuth: admin.auth.Auth | null;

if (config.get('env') !== 'test') {
  internalApp = admin.initializeApp();
  internalDB = admin.firestore();
  internalAuth = admin.auth();
} else {
  internalApp = firebaseTest.initializeAdminApp({ projectId: 'reach-4-help-test' });
  internalDB = internalApp.firestore();
  internalAuth = null;
}

export const app = internalApp;
export const db = internalDB;
export const auth = internalAuth;
