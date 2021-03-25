import * as firebase from '@firebase/testing';
import * as fs from 'fs';

import { User } from '../../src/models/users/User';
import { UserFirestoreConverter } from '../../src/models/users/UserFirestoreConverter';
import { PostFirestoreConverter } from '../../src/models/posts/PostFirestoreConverter';

const projectId = 'reach-4-help-test';

const rules = fs.readFileSync(`${__dirname}/../../../firebase/firestore.rules`, 'utf8');

/**
 * Creates a new app with authentication data matching the input.
 *
 * @param {object} auth the object to use for authentication (typically {uid: some-uid})
 * @return {object} the app.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const authedApp = (auth?: object) => {
  return firebase.initializeTestApp({ projectId, auth }).firestore();
};
/**
 * Creates a new app with admin authentication.
 *
 * @return {object} the app.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const adminApp = () => {
  return firebase.initializeAdminApp({ projectId }).firestore();
};

beforeAll(async () => {
  await firebase.loadFirestoreRules({ projectId, rules });
});

beforeEach(async () => {
  // Clear the database between tests
  await firebase.clearFirestoreData({ projectId });
});

afterAll(async () => {
  await Promise.all(firebase.apps().map(app => app.delete()));
});

describe('users', () => {
  it('require users to log in before reading a profile', async () => {
    const db = authedApp();
    const profile = db.collection('users').doc('1234');
    await firebase.assertFails(profile.get());
  });

  it('require users to log in before listing profiles', async () => {
    const db = authedApp();
    const profile = db.collection('users');
    await firebase.assertFails(profile.get());
  });

  it('authenticated users can read other users profiles', async () => {
    const db = authedApp({ uid: '1234' });
    const profile = db.collection('users').doc('5678');
    await firebase.assertSucceeds(profile.get());
  });

  it('authenticated users can list users profiles', async () => {
    const db = authedApp({ uid: '1234' });
    const profile = db.collection('users');
    await firebase.assertSucceeds(profile.get());
  });

  it('require users to log in before creating a profile', async () => {
    const db = authedApp();
    const profile = db.collection('users').doc('1234');
    await firebase.assertFails(
      profile.withConverter(UserFirestoreConverter).set(
        User.factory({
          username: 'test_user',
        }),
      ),
    );
  });

  it('users can only write to their own profile', async () => {
    const db = authedApp({ uid: '1234' });
    const profile = db.collection('users').doc('5678');
    await firebase.assertFails(
      profile.withConverter(UserFirestoreConverter).set(
        User.factory({
          username: 'test_user',
        }),
      ),
    );
  });

  it('user id chain must be intact when writing to user.privilegedInformation', async () => {
    const db = authedApp({ uid: '1234' });
    const data = db
      .collection('users')
      .doc('1234')
      .collection('privilegedInformation')
      .doc('5678');
    await firebase.assertFails(
      data.set({
        address: { a: 1 },
        termsAccepted: firebase.firestore.FieldValue.serverTimestamp(),
        termsVersion: '1.0',
      }),
    );
  });

  it('should enforce the correct user data in users collection', async () => {
    const db = authedApp({ uid: '1234' });
    const profile = db.collection('users').doc('1234');
    await firebase.assertFails(profile.set({ username: 'test_user' }));
    await firebase.assertSucceeds(
      profile.withConverter(UserFirestoreConverter).set(
        User.factory({
          username: 'test_user',
        }),
      ),
    );
  });

  it('should enforce the correct user data in user.privilegedInformation collection', async () => {
    const db = authedApp({ uid: '1234' });
    const data = db
      .collection('users')
      .doc('1234')
      .collection('privilegedInformation')
      .doc('1234');
    await firebase.assertFails(data.set({ fail: 'missing-keys' }));
    await firebase.assertSucceeds(
      data.set({
        addresses: { default: { name: 'default' } },
        termsAccepted: firebase.firestore.FieldValue.serverTimestamp(),
        termsVersion: '1.0',
      }),
    );
  });
});

describe('posts', () => {
  const createData = async () => {
    const db = adminApp();
    await firebase.assertSucceeds(
      db
        .collection('users')
        .doc('pin-1')
        .withConverter(UserFirestoreConverter)
        .set(
          User.factory({
            username: 'pin-1',
          }),
        ),
    );
    await firebase.assertSucceeds(
      db
        .collection('users')
        .doc('cav-1')
        .withConverter(UserFirestoreConverter)
        .set(
          User.factory({
            username: 'cav-1',
          }),
        ),
    );
    await firebase.assertSucceeds(
      db
        .collection('users')
        .doc('cav-2')
        .withConverter(UserFirestoreConverter)
        .set(
          User.factory({
            username: 'cav-2',
          }),
        ),
    );
  };

  it('require users to log in before listing posts', async () => {
    const db = authedApp();
    const posts = db.collection('posts');
    await firebase.assertFails(posts.get());
  });

  it('only pins can list posts that belong to them', async () => {
    await createData();

    // Read from DB authed as PIN2, but filter by PIN1 - ERROR
    const dbPin2 = authedApp({ uid: 'pin-2', pin: true });
    const pin1RefAsPin2 = dbPin2.collection('users').doc('pin-1');
    const post1RefAsPin2 = dbPin2.collection('posts').doc('post-1');
    await firebase.assertFails(
      dbPin2
        .collection('posts')
        .where('pinUserRef', '==', pin1RefAsPin2)
        .get(),
    );
    await firebase.assertFails(post1RefAsPin2.get());

    // Read from DB authed as PIN1, filter by PIN1 - SUCCESS
    const dbPin1 = authedApp({ uid: 'pin-1', pin: true });
    const post1RefAsPin1 = dbPin1.collection('posts').doc('post-1');

    await firebase.assertSucceeds(
      post1RefAsPin1
        .withConverter(PostFirestoreConverter)
        .get()
        .then(doc => {
          expect(doc.exists).toBeTruthy();
        }),
    );
  });

  // Check this for more info: https://firebase.google.com/docs/firestore/security/rules-conditions
  it('Users cannot list the entire posts collection without a query on PIN or CAV', async () => {
    // Even though there is only data with pin-1 as the ref...
    const dbPin1 = authedApp({ uid: 'pin-1', pin: true });
    await firebase.assertFails(dbPin1.collection('posts').get());

    // Would fail anyways as all the records mention pin-1 as the ref...
    const dbPin2 = authedApp({ uid: 'pin-2', pin: true });
    await firebase.assertFails(dbPin2.collection('posts').get());
  });
});

describe('posts', () => {
  it('require users to log in before listing posts', async () => {
    const db = authedApp();
    const posts = db.collection('posts');
    await firebase.assertFails(posts.get());
  });
});
