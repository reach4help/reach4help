import { validateOrReject } from 'class-validator';
import { EventContext } from 'firebase-functions/lib/cloud-functions';
import * as admin from 'firebase-admin';

import { auth, db } from '../app';
import { IUser } from '../models/users/IUser';
import { User } from '../models/users/User';

import DocumentSnapshot = admin.firestore.DocumentSnapshot;

export const validateUser = (value: IUser): Promise<void> => {
  return validateOrReject(User.factory(value)).then(() => {
    return Promise.resolve();
  });
};

export const setIsUserPin = (userId: string, status: boolean): Promise<void> => {
  if (!auth) {
    return Promise.resolve();
  }

  return auth?.setCustomUserClaims(userId, { pin: status });
};

export const setIsUserCav = (userId: string, status: boolean): Promise<void> => {
  if (!auth) {
    return Promise.resolve();
  }

  return auth?.setCustomUserClaims(userId, { cav: status });
};

export const onCreate = (snapshot: DocumentSnapshot, context: EventContext) => {
  return validateUser(snapshot.data() as IUser).catch(() => {
    return db
      .collection('users')
      .doc(context.params.userId)
      .delete()
      .catch(() => {
        return Promise.resolve();
      });
  });
};
