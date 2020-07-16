import * as firebase from '@firebase/testing';

import { firebaseFunctionsTest } from '../index.test';
import { deleteUserData as deleteUserDataFunc } from '../../src/https/api/users';
import { User, UserFirestoreConverter } from '../../src/models/users';

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
    const privilegedRef = ref.collection('privilegedInformation');
    expect((await privilegedRef.get()).docs).toHaveLength(1);
    await deleteUserData(null, {
      auth: {
        uid: userId,
      },
    });
    expect((await privilegedRef.get()).docs).toHaveLength(0);
    const user = await ref
      .withConverter(UserFirestoreConverter)
      .get();
    expect(user.data()?.displayPicture).toBeNull();
    expect(user.data()?.displayName).toBe('Deleted User');
    expect(user.data()?.username).toBe('deleteduser');
    expect(user.data()?.cavQuestionnaireRef).toBeNull();
    expect(user.data()?.pinQuestionnaireRef).toBeNull();
  });

  // it(`user with request: 
  //   personal data should be deleted, request/timeline should be updated`, async () => {

  // });

  // it(`user with unaccepted offer: 
  //   personal data should be deleted, offer should be deleted`, async () => {

  // });

  // it(`user with accepted offer: 
  //   personal data should be deleted, offer/request/timelines should be updated`, async () => {

  // });
});
