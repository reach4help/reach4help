import { validateOrReject } from 'class-validator';
import { EventContext } from 'firebase-functions/lib/cloud-functions';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { IUser, User } from '../models/users';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

const validateUser = (value: IUser): Promise<void> => {
  return validateOrReject(User.factory(value)).then(() => {
    return Promise.resolve();
  });
};

export const onCreate = (snapshot: DocumentSnapshot, context: EventContext) => {
  return validateUser(snapshot.data() as IUser)
    .catch(errors => {
      console.error('Invalid User Found: ', errors);
      return db
        .collection('users')
        .doc(context.params.userId)
        .delete();
    });
};
