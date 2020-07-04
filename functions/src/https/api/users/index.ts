import * as functions from 'firebase-functions';
import { firestore } from 'firebase-admin';

import { auth, db } from '../../../app';
import { IRequest, Request } from '../../../models/requests';
import { IUser, User } from '../../../models/users';

// 'require' instead of 'import' workaround b/c type declarations for this module does not exist
// eslint-disable-next-line @typescript-eslint/no-var-requires
const firebaseTools = require('firebase-tools');

const deleteUserPrivilegedInformation = async (userId: string) => {
  await firebaseTools.firestore.delete(`users/${userId}/privilegedInformation`, {
    project: process.env.GCLOUD_PROJECT,
    recursive: true,
    yes: true,
    token: functions.config().fb.token,
  });

  return {
    path: `users/${userId}/privilegedInformation`,
  };
};

const deleteUserTimelines = async (userRef: firestore.DocumentReference, deletedUser: User) => {
  const userTimelines = await db
    .collectionGroup('timeline')
    .where('actorRef', '==', userRef)
    .get();
  for (const doc of userTimelines.docs) {
    doc.ref.update({
      actorSnapshot: deletedUser,
    });
  }
};

const deletePinUserRequests = async (userRef: firestore.DocumentReference, deletedUser: User) => {
  const userRequests = await db
    .collection('requests')
    .where('pinUserRef', '==', userRef)
    .get();
  const nullLatLng = new firestore.GeoPoint(0, 0);
  const deletedAddress = 'deleted address';
  for (const doc of userRequests.docs) {
    doc.ref.update({
      pinUserSnapshot: deletedUser,
      latLng: nullLatLng,
      streetAddress: deletedAddress,
    });
    const requestTimelines = await doc.ref.collection('timeline').get();
    const deletedRequestSnapshot = Request.factory(doc.data() as IRequest);
    deletedRequestSnapshot.pinUserSnapshot = deletedUser;
    deletedRequestSnapshot.latLng = nullLatLng;
    deletedRequestSnapshot.streetAddress = deletedAddress;
    for (const timelineDoc of requestTimelines.docs) {
      timelineDoc.ref.update({
        requestSnapshot: deletedRequestSnapshot,
      });
    }
  }
};

const deleteCavUserRequests = async (userRef: firestore.DocumentReference, deletedUser: User) => {
  const userRequests = await db
    .collection('requests')
    .where('cavUserRef', '==', userRef)
    .get();
  for (const doc of userRequests.docs) {
    doc.ref.update({
      cavUserSnapshot: deletedUser,
    });
    const requestTimelines = await doc.ref.collection('timeline').get();
    const deletedRequestSnapshot = Request.factory(doc.data() as IRequest);
    deletedRequestSnapshot.cavUserSnapshot = deletedUser;
    for (const timelineDoc of requestTimelines.docs) {
      timelineDoc.ref.update({
        requestSnapshot: deletedRequestSnapshot,
      });
    }
  }
};

const deleteCavUserOffers = async (userRef: firestore.DocumentReference, deletedUser: User) => {
  const userOffers = await db
    .collection('offers')
    .where('cavUserRef', '==', userRef)
    .get();
  for (const doc of userOffers.docs) {
    doc.ref.update({
      cavUserSnapshot: deletedUser,
    });
  }
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
    deletedUser.cavQuestionnaireRef = null;
    deletedUser.pinQuestionnaireRef = null;
    await deleteUserPrivilegedInformation(userId);
    await deleteUserTimelines(userRef, deletedUser);
    await deletePinUserRequests(userRef, deletedUser);
    await deleteCavUserRequests(userRef, deletedUser);
    await deleteCavUserOffers(userRef, deletedUser);

    // delete the user from auth itself.
    await auth?.deleteUser(userRef.id);
  } catch (err) {
    throw new functions.https.HttpsError('internal', 'deleting all user data failed', err);
  }
});
