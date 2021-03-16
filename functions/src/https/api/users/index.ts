import * as functions from 'firebase-functions';
import { firestore } from 'firebase-admin';

import { auth, db } from '../../../app';
import { IUser, User } from '../../../models/users';

const deleteQueryBatch = async (query: firestore.Query, resolve: Function) => {
  const querySnapshot = await query.get();
  const batchSize = querySnapshot.size;
  if (batchSize === 0) {
    console.log('Completed batch deletes');
    resolve();
    return;
  }

  const batch = db.batch();
  querySnapshot.docs.forEach(doc => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  process.nextTick(() => {
    deleteQueryBatch(query, resolve);
  });
};

// eslint-disable-next-line no-unused-vars
const updateQueryBatch = async (query: firestore.Query, resolve: Function, updatedFields: {}) => {
  const querySnapshot = await query.get();
  const batchSize = querySnapshot.size;
  if (batchSize === 0) {
    console.log('Completed batch updates');
    resolve();
    return;
  }

  const batch = db.batch();
  querySnapshot.docs.forEach(doc => {
    batch.update(doc.ref, updatedFields);
  });
  await batch.commit();

  process.nextTick(() => {
    updateQueryBatch(query, resolve, updatedFields);
  });
};

const deleteUserPrivilegedInformation = async (userRef: firestore.DocumentReference) => {
  const userPrivilegedInfoQuery = userRef.collection('privilegedInformation').limit(500);
  return new Promise((resolve, reject) => {
    try {
      deleteQueryBatch(userPrivilegedInfoQuery, resolve);
    } catch {
      reject();
    }
  });
};

export const deleteUserData = functions.https.onCall(async (data, context) => {
  const userId = context.auth?.uid;
  if (!userId) {
    throw new functions.https.HttpsError('unauthenticated', "Can't determine the logged in user");
  }

  try {
    const userRef = db.collection('users').doc(userId);
    const deletedUser = User.factory((await userRef.get()).data() as IUser);
    deletedUser.displayPicture = null;
    deletedUser.displayName = 'Deleted User';
    deletedUser.username = 'deleteduser';

    // ** TODO: (es) delete posts instead
    // await deletePinUserRequests(userRef, deletedUser);
    // console.log('passed pin user requests');
    // await deleteCavUserOffersAndRequests(userRef, deletedUser);
    // console.log('passed cav user responses and posts');

    // delete the user from auth itself.
    await deleteUserPrivilegedInformation(userRef);
    console.log('passed privilege');
    await userRef.update({ ...deletedUser.toObject() });
    await auth?.deleteUser(userRef.id);
    console.log('passed auth');
  } catch (err) {
    console.log('error: ', err);
    throw new functions.https.HttpsError('internal', 'deleting all user data failed', err);
  }
});
