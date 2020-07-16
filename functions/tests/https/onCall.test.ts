import * as firebase from '@firebase/testing';
// import * as firebaseApp from 'firebase-admin';

import { firebaseFunctionsTest } from '../index.test';
import { deleteUserData as deleteUserDataFunc } from '../../src/https/api/users';
// import { Request, RequestFirestoreConverter } from '../../src/models/requests';
import { User, UserFirestoreConverter } from '../../src/models/users';
// import GeoPoint = firebaseApp.firestore.GeoPoint;

const projectId = 'reach-4-help-test';

const adminApp = () => firebase.initializeAdminApp({ projectId }).firestore();

describe('deleteUserData callable cloud function', () => {
  const db = adminApp();
  const deleteUserData = firebaseFunctionsTest.wrap(deleteUserDataFunc);
  const userId = 'user1';

  beforeEach(async () => {
    await firebase.clearFirestoreData({ projectId });
    const testUser = User.factory({
      username: 'new user',
      displayName: 'newUser',
      displayPicture: 'me.png',
    });
    const testPrivilegedInfo = {
      addressFromGoogle: 'Amphitheatre Parkway',
      address: 'Mountain View',
      privacyAccepted: new Date(),
      privacyVersion: '1.0',
      termsAccepted: new Date(),
      termsVersion: '1.0',
      sendNotifications: null,
    };
    const ref = db.collection('users').doc(userId);
    await ref
      .withConverter(UserFirestoreConverter)
      .set(testUser);
    await ref
      .collection('privilegedInformation')
      .doc(userId)
      .set(testPrivilegedInfo);
  });

  afterAll(async () => {
    await Promise.all(firebase.apps().map(app => app.delete()));
  });

  it('new user: personal data should be deleted', async () => {
    const ref = db.collection('users').doc(userId);
    const userRef = ref.withConverter(UserFirestoreConverter);
    const privilegedRef = ref.collection('privilegedInformation');

    const prevSnap = (await userRef.get()).data();
    expect((await privilegedRef.get()).docs).toHaveLength(1);
    expect(prevSnap?.displayPicture).toBe('me.png');
    expect(prevSnap?.displayName).toBe('newUser');
    expect(prevSnap?.username).toBe('new user');

    await deleteUserData(undefined, {
      auth: {
        uid: userId,
      },
    });

    const afterSnap = (await userRef.get()).data();
    expect((await privilegedRef.get()).docs).toHaveLength(0);
    expect(afterSnap?.displayPicture).toBeNull();
    expect(afterSnap?.displayName).toBe('Deleted User');
    expect(afterSnap?.username).toBe('deleteduser');
  });

  // it(`user with request: 
  //   personal data should be deleted, request/timeline should be updated`, async () => {
  //     const ref = db.collection('users').doc(userId);
  //     const userRef = ref.withConverter(UserFirestoreConverter);
  //     const privilegedRef = ref.collection('privilegedInformation');

  //     const testUser = User.factory({
  //       username: 'new user',
  //       displayName: 'newUser',
  //       displayPicture: 'me.png',
  //     });
  //     const testRequest = Request.factory({
  //       pinUserRef: ref as any,
  //       pinUserSnapshot: testUser,
  //       title: 'I need help!',
  //       description: 'Please help with groceries',
  //       latLng: new GeoPoint(10, -122),
  //       streetAddress: '123 Main St.',
  //     });
  //     await db
  //       .collection('requests')
  //       .withConverter(RequestFirestoreConverter)
  //       .doc(userId)
  //       .set(testRequest);

  //     await deleteUserData(undefined, {
  //       auth: {
  //         uid: userId,
  //       },
  //     });

  //     const requestSnap = (await db
  //       .collection('requests')
  //       .withConverter(RequestFirestoreConverter)
  //       .doc(userId)
  //       .get())
  //       .data();
  //     expect(requestSnap?.pinUserSnapshot.username).toBe('deleteduser');
  //     expect(requestSnap?.pinUserSnapshot.displayName).toBe('Deleted User');
  //     expect(requestSnap?.pinUserSnapshot.displayName).toBeNull();

  //     const afterSnap = (await userRef.get()).data();
  //     expect((await privilegedRef.get()).docs).toHaveLength(0);
  //     expect(afterSnap?.displayPicture).toBeNull();
  //     expect(afterSnap?.displayName).toBe('Deleted User');
  //     expect(afterSnap?.username).toBe('deleteduser');
  // });

  // it(`user with unaccepted offer: 
  //   personal data should be deleted, offer should be deleted`, async () => {

  // });

  // it(`user with accepted offer: 
  //   personal data should be deleted, offer/request/timelines should be updated`, async () => {

  // });
});
