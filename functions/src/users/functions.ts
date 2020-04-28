import { validateOrReject } from 'class-validator';
import { EventContext } from 'firebase-functions/lib/cloud-functions';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { IUser, User } from '../models/users';
import * as admin from 'firebase-admin';
import * as firebaseTest from '@firebase/testing';

const projectId = 'reach-4-help-test';

let db: any = undefined;
let auth: any = undefined;
let test = true;

if(process.env.FIREBASE_CONFIG){
  let config = JSON.parse(process.env.FIREBASE_CONFIG);
  if(config.databaseURL && config.databaseURL !== 'undefined'){
    admin.initializeApp();
    db = admin.firestore();
    auth = admin.auth();
    test = false;
  }
}

if(test){
  db = firebaseTest.initializeAdminApp({ projectId }).firestore();
}


export const validateUser = (value: IUser): Promise<void> => {
  return validateOrReject(User.factory(value)).then(() => {
    return Promise.resolve();
  });
};

export const setIsUserPin = (userId: string, status: boolean): Promise<void> => {
  if(test){
    return Promise.resolve();
  }else{
    return auth.setCustomUserClaims(userId, { pin: status });
  }
};

export const setIsUserCav = (userId: string, status: boolean): Promise<void> => {
  if(test){
    return Promise.resolve();
  }else{
    return auth.setCustomUserClaims(userId, { cav: status });
  }
};

export const onCreate = (snapshot: DocumentSnapshot, context: EventContext) => {
  return validateUser(snapshot.data() as IUser)
    .then(() => {
      const operations: Promise<void>[] = [];
      return Promise.all(operations);
    })
    .catch(errors => {
      return db
        .collection('users')
        .doc(context.params.userId)
        .delete();
    });
};
