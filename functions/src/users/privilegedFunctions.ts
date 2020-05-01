import * as firebaseTest from '@firebase/testing';
import { validateOrReject } from 'class-validator';
import { EventContext } from 'firebase-functions/lib/cloud-functions';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { IPrivilegedUserInformation, PrivilegedUserInformation } from '../models/users/privilegedInformation';
import * as admin from 'firebase-admin';

const projectId = 'reach-4-help-test';

let db: any;
let test = true;

if (process.env.FIREBASE_CONFIG) {
  const config = JSON.parse(process.env.FIREBASE_CONFIG);
  if (config.databaseURL && config.databaseURL !== 'undefined') {
    admin.initializeApp();
    db = admin.firestore();
    test = false;
  }
}

if (test) {
  db = firebaseTest.initializeAdminApp({ projectId }).firestore();
}
const validateUserPrivilegedInformation = (value: IPrivilegedUserInformation): Promise<void> => {
  return validateOrReject(PrivilegedUserInformation.factory(value)).then(() => {
    return Promise.resolve();
  });
};

export const onCreate = (snapshot: DocumentSnapshot, context: EventContext) => {
  return validateUserPrivilegedInformation(snapshot.data() as IPrivilegedUserInformation).catch(errors => {
    console.error('Invalid User Privileged Information Found: ', errors);
    return db
      .collection('users')
      .doc(context.params.userId)
      .collection('privilegedInformation')
      .doc(context.params.informationId)
      .delete();
  });
};
