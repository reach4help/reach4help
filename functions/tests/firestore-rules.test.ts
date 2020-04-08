import * as firebase from '@firebase/testing';
import * as fs from 'fs';

const projectId = 'reach-4-help-test';

const rules = fs.readFileSync(`${__dirname}/../../firebase/firestore.rules`, 'utf8');

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

  it('require users to log in before listing profiles', async () => {
    const db = authedApp(null);
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

  it('user id chain must be intact when writing to user.privilegedInformation', async () => {
    const db = authedApp({ uid: '1234' });
    const data = db.collection('users').doc('1234').collection('privilegedInformation').doc('5678');
    await firebase.assertFails(
      data.set({
        data: 1,
      }),
    );
  });

  it('should enforce the correct user data in users collection', async () => {
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

  it('should enforce the correct user data in user.privilegedInformation collection', async () => {
    const db = authedApp({ uid: '1234' });
    const data = db.collection('users').doc('1234').collection('privilegedInformation').doc('1234');
    await firebase.assertFails(data.set({ fail: 'missing-keys' }));
    await firebase.assertSucceeds(
      data.set({
        address: { a: 1 },
        termsAccepted: firebase.firestore.FieldValue.serverTimestamp(),
        termsVersion: '1.0',
      }),
    );
  });
});

describe('offers', () => {
  beforeAll(async () => {
    const dbPin = authedApp({ uid: 'pin-1' });
    await firebase.assertSucceeds(
      dbPin
        .collection('users')
        .doc('pin-1')
        .set({
          averageRating: 1,
          casesCompleted: 0,
          requestsMade: 0,
          username: 'pin-1',
        }),
    );

    const dbCav = authedApp({ uid: 'cav-1' });
    await firebase.assertSucceeds(
      dbCav
        .collection('users')
        .doc('cav-1')
        .set({
          averageRating: 1,
          casesCompleted: 0,
          requestsMade: 0,
          username: 'cav-1',
        }),
    );

    await firebase.assertSucceeds(
      dbCav
        .collection('offers')
        .doc('offer-1')
        .set({
          cavUserRef: dbCav.collection('users').doc('cav-1'),
          pinUserRef: dbCav.collection('users').doc('pin-1'),
          requestRef: dbCav.collection('requests').doc('request-1'),
          cavSnapshot: {
            averageRating: 1,
            casesCompleted: 0,
            requestsMade: 0,
            username: 'CAV User',
          },
          message: 'I can help!',
          status: 'pending',
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        }),
    );
  });

  it('require users to log in before listing offers', async () => {
    const db = authedApp(null);
    const offers = db.collection('offers');
    await firebase.assertFails(offers.get());
  });

  it.skip('only pins can list offers that belong to them', async () => {
    // Read from DB authed as PIN2, but filter by PIN1 - ERROR
    const dbPin2 = authedApp({ uid: 'pin-2' });
    const pin1RefAsPin2 = dbPin2.collection('users').doc('pin-1');
    await firebase.assertFails(dbPin2.collection('offers').where('pinUserRef', '==', pin1RefAsPin2).get());

    // Read from DB authed as PIN1, filter by PIN1 - SUCCESS
    const dbPin1 = authedApp({ uid: 'pin-1' });
    const pin1Ref = dbPin1.collection('users').doc('pin-1');
    await firebase.assertSucceeds(dbPin1.collection('offers').where('pinUserRef', '==', pin1Ref).get());
  });
});
