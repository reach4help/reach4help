import * as firebase from '@firebase/testing';
import { firestore } from 'firebase-admin';
import * as Test from 'firebase-functions-test';

import { deleteUserData as deleteUserDataFunc } from '../../../src/https/api/users';
import { Offer, OfferFirestoreConverter, OfferStatus } from '../../../src/models/offers';
import { Request, RequestFirestoreConverter, RequestStatus } from '../../../src/models/requests';
import { User, UserFirestoreConverter } from '../../../src/models/users';

const projectId = 'reach-4-help-test';

const test = Test();

const adminApp = () => firebase.initializeAdminApp({ projectId }).firestore();

const db = adminApp();
const deleteUserData = test.wrap(deleteUserDataFunc);
const userId = 'user1';
const userId2 = 'user2';
const deletedAddress = 'deleted address';

beforeEach(async () => {
  // clear database and create new user before each test
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
  await ref.withConverter(UserFirestoreConverter).set(testUser);
  await ref
    .collection('privilegedInformation')
    .doc(userId)
    .set(testPrivilegedInfo);
});

afterAll(async () => {
  // clear firebase apps after all tests
  await Promise.all(firebase.apps().map(app => app.delete()));
});

describe('deleteUserData: new user', () => {
  it('all personal data should be deleted', async () => {
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
});

describe('deleteUserData: user with request', () => {
  const ref = db.collection('users').doc(userId);
  const userRef = ref.withConverter(UserFirestoreConverter);
  const privilegedRef = ref.collection('privilegedInformation');
  const requestRef = db.collection('requests').doc(userId);

  beforeEach(async () => {
    // create a request for new user before each test within this block
    const testUser = User.factory({
      username: 'new user',
      displayName: 'newUser',
      displayPicture: 'me.png',
    });
    const testRequest = Request.factory({
      pinUserRef: ref as any,
      pinUserSnapshot: testUser,
      title: 'I need help!',
      description: 'Please help with groceries',
      latLng: new firestore.GeoPoint(10, -122),
      streetAddress: '123 Main St.',
    });
    await requestRef.withConverter(RequestFirestoreConverter).set(testRequest);
  });

  it('all personal data should be deleted', async () => {
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

  it('request should be updated to deleted state', async () => {
    await deleteUserData(undefined, {
      auth: {
        uid: userId,
      },
    });

    const requestSnap = (await requestRef.withConverter(RequestFirestoreConverter).get()).data();
    expect(requestSnap?.pinUserSnapshot.username).toBe('deleteduser');
    expect(requestSnap?.pinUserSnapshot.displayName).toBe('Deleted User');
    expect(requestSnap?.pinUserSnapshot.displayPicture).toBeNull();
    expect(requestSnap?.status).toBe(RequestStatus.removed);
    expect(requestSnap?.latLng).toBe(JSON.stringify(new firestore.GeoPoint(0, 0)));
    expect(requestSnap?.streetAddress).toBe(deletedAddress);
  });

  describe('deleteUserData: user with request and offer', () => {
    const ref2 = db.collection('users').doc(userId2);
    const offerRef = db.collection('offers').doc(userId);
    const requestRef2 = db.collection('requests').doc(userId2);

    beforeEach(async () => {
      // create an offer for new user before each test within this block
      const cavUser = User.factory({
        username: 'new user',
        displayName: 'newUser',
        displayPicture: 'me.png',
      });
      const pinUser = User.factory({
        username: 'other user',
        displayName: 'otherUser',
        displayPicture: 'them.png',
      });
      await ref.withConverter(UserFirestoreConverter).set(cavUser);
      await ref2.withConverter(UserFirestoreConverter).set(pinUser);
      const testRequest = Request.factory({
        pinUserRef: ref2 as any,
        pinUserSnapshot: pinUser,
        cavUserRef: ref as any,
        cavUserSnapshot: cavUser,
        title: 'I need help!',
        description: 'Please help with groceries',
        latLng: new firestore.GeoPoint(10, -122),
        streetAddress: '123 Main St.',
        status: RequestStatus.pending,
      });
      await requestRef2.withConverter(RequestFirestoreConverter).set(testRequest);
      const testOfferUnaccepted = Offer.factory({
        cavUserRef: ref as any,
        pinUserRef: ref2 as any,
        requestRef: requestRef2 as any,
        cavUserSnapshot: cavUser,
        requestSnapshot: testRequest,
        message: 'Willing to help!',
        status: OfferStatus.pending,
      });
      await offerRef.withConverter(OfferFirestoreConverter).set(testOfferUnaccepted);
    });

    it('personal data should be deleted', async () => {
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

    it('unaccepted offer should be deleted', async () => {
      await deleteUserData(undefined, {
        auth: {
          uid: userId,
        },
      });
      const offerSnapUnaccepted = (await offerRef.withConverter(OfferFirestoreConverter).get()).data();
      expect(offerSnapUnaccepted).toBe(undefined);
    });

    it('accepted offer should be updated', async () => {
      // update unaccepted offer to accepted
      await offerRef.update({
        status: OfferStatus.accepted,
      });

      await deleteUserData(undefined, {
        auth: {
          uid: userId,
        },
      });

      const offerSnapAccepted = (await offerRef.withConverter(OfferFirestoreConverter).get()).data();
      expect(offerSnapAccepted?.cavUserSnapshot.displayPicture).toBeNull();
      expect(offerSnapAccepted?.cavUserSnapshot.displayName).toBe('Deleted User');
      expect(offerSnapAccepted?.cavUserSnapshot.username).toBe('deleteduser');
    });
  });
});
