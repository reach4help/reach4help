import { validateOrReject } from 'class-validator';
import { EventContext } from 'firebase-functions/lib/cloud-functions';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { IPrivilegedUserInformation, PrivilegedUserInformation } from '../models/users/privilegedInformation';
import { db } from '../app';

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
      .delete()
      .catch(() => {
        return Promise.resolve();
      });
  });
};
