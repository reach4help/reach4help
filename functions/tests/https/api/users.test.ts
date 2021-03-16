import * as firebase from '@firebase/testing';
import { firestore } from 'firebase-admin';
import * as Test from 'firebase-functions-test';

import { deleteUserData as deleteUserDataFunc } from '../../../src/https/api/users';
import { Post, PostFirestoreConverter, GenericPostStatus } from '../../../src/models/Post';
import { User, UserFirestoreConverter } from '../../../src/models/users';

const projectId = 'reach-4-help-test';

const test = Test();

const adminApp = () => firebase.initializeAdminApp({ projectId }).firestore();

const db = adminApp();
const deleteUserData = test.wrap(deleteUserDataFunc);
const userId = 'user1';
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
    const testRequest = Post.factory({
      isResponse: false,
      isRequest: false,
      parentRef: null,
      creatorRef: postRef,
      creatorSnapshot: testUser,
      title: 'I need help!',
      description: 'Please help with groceries',
      latLng: new firestore.GeoPoint(10, -122),
      streetAddress: '123 Main St.',
    });
    await postRef.withConverter(PostFirestoreConverter).set(testRequest);
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

    const postSnap = (await postRef.withConverter(PostFirestoreConverter).get()).data();
    expect(postSnap?.status).toBe(GenericPostStatus.removed);
    expect(postSnap?.latLng).toBe(JSON.stringify(new firestore.GeoPoint(0, 0)));
    expect(postSnap?.streetAddress).toBe(deletedAddress);
  });
});
