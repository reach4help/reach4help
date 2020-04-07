import * as firebase from '@firebase/testing';
import * as fs from 'fs';

const projectId = 'reach-4-help-test';

const rules = fs.readFileSync(__dirname + '/../../firebase/firestore.rules', 'utf8');

/**
 * Creates a new app with authentication data matching the input.
 *
 * @param {object} auth the object to use for authentication (typically {uid: some-uid})
 * @return {object} the app.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const authedApp = (auth: any) => {
  return firebase
    .initializeTestApp({ projectId, auth })
    .firestore();
};

/*
 * ============
 *  Test Cases
 * ============
 */
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
    const db = authedApp(null);
    const profile = db.collection('users').doc('1234');
    await firebase.assertFails(profile.get());
  });

  it('authenticated users can read other users profiles', async () => {
    const db = authedApp({ uid: '1234' });
    const profile = db.collection('users').doc('5678');
    await firebase.assertSucceeds(profile.get());
  });

  it('require users to log in before creating a profile', async () => {
    const db = authedApp(null);
    const profile = db.collection('users').doc('1234');
    await firebase.assertFails(
      profile.set({
        averageRating: 1,
        casesCompleted: 0,
        requestsMade: 0,
        username: 'TestUser',
      }),
    );
  });

  it('users can only write to their own profile', async () => {
    const db = authedApp({ uid: '1234' });
    const profile = db.collection('users').doc('5678');
    await firebase.assertFails(
      profile.set({
        averageRating: 1,
        casesCompleted: 0,
        requestsMade: 0,
        username: 'TestUser',
      }),
    );
  });

  it('should enforce the correct user data in user profiles', async () => {
    const db = authedApp({ uid: '1234' });
    const profile = db.collection('users').doc('1234');
    await firebase.assertFails(profile.set({ username: 'test_user' }));
    await firebase.assertSucceeds(
      profile.set({
        averageRating: 1,
        casesCompleted: 0,
        requestsMade: 0,
        username: 'test_user',
      }),
    );
  });
});

/*

  @test
  async 'should only let users create their own profile'() {
    const db = authedApp({ uid: 'alice' });
    await firebase.assertSucceeds(
      db
        .collection('users')
        .doc('alice')
        .set({
          birthday: 'January 1',
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        }),
    );
    await firebase.assertFails(
      db
        .collection('users')
        .doc('bob')
        .set({
          birthday: 'January 1',
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        }),
    );
  }

  async 'should let anyone read any profile'() {
    const db = authedApp(null);
    const profile = db.collection('users').doc('alice');
    await firebase.assertSucceeds(profile.get());
  }

  async 'should let anyone create a room'() {
    const db = authedApp({ uid: 'alice' });
    const room = db.collection('rooms').doc('firebase');
    await firebase.assertSucceeds(
      room.set({
        owner: 'alice',
        topic: 'All Things Firebase',
      }),
    );
  }

  async 'should force people to name themselves as room owner when creating a room'() {
    const db = authedApp({ uid: 'alice' });
    const room = db.collection('rooms').doc('firebase');
    await firebase.assertFails(
      room.set({
        owner: 'scott',
        topic: 'Firebase Rocks!',
      }),
    );
  }

  @test
  async 'should not let one user steal a room from another user'() {
    const alice = authedApp({ uid: 'alice' });
    const bob = authedApp({ uid: 'bob' });

    await firebase.assertSucceeds(
      bob
        .collection('rooms')
        .doc('snow')
        .set({
          owner: 'bob',
          topic: 'All Things Snowboarding',
        }),
    );

    await firebase.assertFails(
      alice
        .collection('rooms')
        .doc('snow')
        .set({
          owner: 'alice',
          topic: 'skiing > snowboarding',
        }),
    );
  }
}

 */
