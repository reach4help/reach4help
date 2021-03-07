import * as firebase from '@firebase/testing';
import { firestore } from 'firebase-admin';
import * as Test from 'firebase-functions-test';

import { deleteUserData as deleteUserDataFunc } from '../../../src/https/api/users';
import { Offer, OfferFirestoreConverter, OfferStatus } from '../../../src/models/posts';
import { Request, RequestFirestoreConverter, RequestStatus } from '../../../src/models/posts';
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
    addresses: { default: { name: 'default' } },
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

describe('deleteUserData: user with post', () => {
  const ref = db.collection('users').doc(userId);
  const userRef = ref.withConverter(UserFirestoreConverter);
  const privilegedRef = ref.collection('privilegedInformation');
  const postRef = db.collection('posts').doc(userId);

  beforeEach(async () => {
    // create a post for new user before each test within this block
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
      responseCount: 0,
      rejectionCount: 0,
      firstResponseMade: null,
      firstRejectionMade: null,
      lastResponseMade: null,
      lastRejectionMade: null,
    });
    await postRef.withConverter(RequestFirestoreConverter).set(testRequest);
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

  it('post should be updated to deleted state', async () => {
    await deleteUserData(undefined, {
      auth: {
        uid: userId,
      },
    });

    const postSnap = (await postRef.withConverter(RequestFirestoreConverter).get()).data();
    expect(postSnap?.pinUserSnapshot.username).toBe('deleteduser');
    expect(postSnap?.pinUserSnapshot.displayName).toBe('Deleted User');
    expect(postSnap?.pinUserSnapshot.displayPicture).toBeNull();
    expect(postSnap?.status).toBe(RequestStatus.removed);
    expect(postSnap?.latLng).toBe(JSON.stringify(new firestore.GeoPoint(0, 0)));
    expect(postSnap?.streetAddress).toBe(deletedAddress);
  });

  describe('deleteUserData: user with post and post', () => {
    const ref2 = db.collection('users').doc(userId2);
    const postRef = db.collection('posts').doc(userId);
    const postRef2 = db.collection('posts').doc(userId2);

    beforeEach(async () => {
      // create an post for new user before each test within this block
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
        responseCount: 0,
        rejectionCount: 0,
        firstResponseMade: null,
        firstRejectionMade: null,
        lastResponseMade: null,
        lastRejectionMade: null,
        status: RequestStatus.pending,
      });
      await postRef2.withConverter(RequestFirestoreConverter).set(testRequest);
      const testOfferUnaccepted = Offer.factory({
        cavUserRef: ref as any,
        pinUserRef: ref2 as any,
        postRef: postRef2 as any,
        cavUserSnapshot: cavUser,
        postSnapshot: testRequest,
        message: 'Willing to help!',
        status: OfferStatus.pending,
      });
      await postRef.withConverter(OfferFirestoreConverter).set(testOfferUnaccepted);
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

    it('unaccepted post should be deleted', async () => {
      await deleteUserData(undefined, {
        auth: {
          uid: userId,
        },
      });
      const postSnapUnaccepted = (await postRef.withConverter(OfferFirestoreConverter).get()).data();
      expect(postSnapUnaccepted).toBe(undefined);
    });

    it('accepted post should be updated', async () => {
      // update unaccepted post to accepted
      await postRef.update({
        status: OfferStatus.accepted,
      });

      await deleteUserData(undefined, {
        auth: {
          uid: userId,
        },
      });

      const postSnapAccepted = (await postRef.withConverter(OfferFirestoreConverter).get()).data();
      expect(postSnapAccepted?.cavUserSnapshot.displayPicture).toBeNull();
      expect(postSnapAccepted?.cavUserSnapshot.displayName).toBe('Deleted User');
      expect(postSnapAccepted?.cavUserSnapshot.username).toBe('deleteduser');
    });
  });
});
