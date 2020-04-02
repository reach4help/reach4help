import { validate } from 'class-validator';
import { firestore } from 'firebase-admin';
import * as functions from 'firebase-functions';
import { EventContext } from 'firebase-functions/lib/cloud-functions';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';

import { IUser, User } from '../models/users';

const validateUser = (value: IUser): Promise<void> => {
  return validate(User.factory(value))
    .then(() => {
      return Promise.resolve();
    });
};

export const triggerEventsWhenUserIsCreated = functions.firestore.document('users/{userId}')
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  .onCreate((snapshot: DocumentSnapshot, context: EventContext) => {
    return validateUser(snapshot.data() as IUser)
      .catch(errors => {
        console.error('Invalid User Found: ', errors);
        return firestore().collection('users').doc(context.params.userId)
          .delete();
      });
  });

export * from './privilegedInformation';
