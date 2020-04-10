import * as firebase from '@firebase/testing';
import * as fs from 'fs';

import { OfferFirestoreConverter } from '../src/models/offers';
import {
  QuestionnaireFirestoreConverter,
  QuestionnaireType,
} from '../src/models/questionnaires';

const projectId = 'reach-4-help-test';

const rules = fs.readFileSync(
  `${__dirname}/../../firebase/firestore.rules`,
  'utf8',
);

/**
 * Creates a new app with authentication data matching the input.
 *
 * @param {object} auth the object to use for authentication (typically {uid: some-uid})
 * @return {object} the app.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const authedApp = (auth: any) => {
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
    const data = db
      .collection('users')
      .doc('1234')
      .collection('privilegedInformation')
      .doc('5678');
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
    const data = db
      .collection('users')
      .doc('1234')
      .collection('privilegedInformation')
      .doc('1234');
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
  const createData = async () => {
    const db = adminApp();
    await firebase.assertSucceeds(
      db
        .collection('users')
        .doc('pin-1')
        .set({
          averageRating: 1,
          casesCompleted: 0,
          requestsMade: 0,
          username: 'pin-1',
        }),
    );
    await firebase.assertSucceeds(
      db
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
      db
        .collection('users')
        .doc('cav-2')
        .set({
          averageRating: 1,
          casesCompleted: 0,
          requestsMade: 0,
          username: 'cav-2',
        }),
    );
    await firebase.assertSucceeds(
      db
        .collection('offers')
        .doc('offer-1')
        .set({
          cavUserRef: db.collection('users').doc('cav-1'),
          pinUserRef: db.collection('users').doc('pin-1'),
          requestRef: db.collection('requests').doc('request-1'),
          cavUserSnapshot: {
            averageRating: 1,
            casesCompleted: 0,
            requestsMade: 0,
            username: 'cav-1',
          },
          message: 'I can help!',
          status: 'pending',
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        }),
    );

    await firebase.assertSucceeds(
      db
        .collection('offers')
        .doc('offer-2')
        .set({
          cavUserRef: db.collection('users').doc('cav-2'),
          pinUserRef: db.collection('users').doc('pin-1'),
          requestRef: db.collection('requests').doc('request-1'),
          cavUserSnapshot: {
            averageRating: 1,
            casesCompleted: 0,
            requestsMade: 0,
            username: 'cav-2',
          },
          message: 'I can help!!',
          status: 'pending',
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        }),
    );
  };

  it('require users to log in before listing offers', async () => {
    const db = authedApp(null);
    const offers = db.collection('offers');
    await firebase.assertFails(offers.get());
  });

  it('only pins can list offers that belong to them', async () => {
    await createData();

    // Read from DB authed as PIN2, but filter by PIN1 - ERROR
    const dbPin2 = authedApp({ uid: 'pin-2' });
    const pin1RefAsPin2 = dbPin2.collection('users').doc('pin-1');
    const offer1RefAsPin2 = dbPin2.collection('offers').doc('offer-1');
    await firebase.assertFails(
      dbPin2
        .collection('offers')
        .where('pinUserRef', '==', pin1RefAsPin2)
        .get(),
    );
    await firebase.assertFails(offer1RefAsPin2.get());

    // Read from DB authed as PIN1, filter by PIN1 - SUCCESS
    const dbPin1 = authedApp({ uid: 'pin-1' });
    const pin1Ref = dbPin1.collection('users').doc('pin-1');
    const offer1RefAsPin1 = dbPin1.collection('offers').doc('offer-1');

    await firebase.assertSucceeds(
      dbPin1
        .collection('offers')
        .where('pinUserRef', '==', pin1Ref)
        .withConverter(OfferFirestoreConverter)
        .get()
        .then(querySnapshot => {
          querySnapshot.docs
            .map(value => value.data())
            .forEach(offer => {
              expect(offer.pinUserRef.id).toBe('pin-1');
            });
        }),
    );
    await firebase.assertSucceeds(
      offer1RefAsPin1
        .withConverter(OfferFirestoreConverter)
        .get()
        .then(doc => {
          expect(doc.exists).toBeTruthy();
        }),
    );
  });

  it('only cavs can list offers that belong to them', async () => {
    await createData();

    // Read from DB authed as CAV3, but filter by CAV1 - ERROR
    const dbCav3 = authedApp({ uid: 'cav-3' });
    const cav1RefAsCav3 = dbCav3.collection('users').doc('cav-1');
    const offer1RefAsCav3 = dbCav3.collection('offers').doc('offer-1');
    await firebase.assertFails(
      dbCav3
        .collection('offers')
        .where('cavUserRef', '==', cav1RefAsCav3)
        .get(),
    );
    await firebase.assertFails(offer1RefAsCav3.get());

    // Read from DB authed as CAV1, filter by CAV1 - SUCCESS
    const dbCav1 = authedApp({ uid: 'cav-1' });
    const cav1Ref = dbCav1.collection('users').doc('cav-1');
    const offer1RefAsCav1 = dbCav1.collection('offers').doc('offer-1');
    await firebase.assertSucceeds(
      dbCav1
        .collection('offers')
        .where('cavUserRef', '==', cav1Ref)
        .withConverter(OfferFirestoreConverter)
        .get()
        .then(querySnapshot => {
          querySnapshot.docs
            .map(value => value.data())
            .forEach(offer => {
              expect(offer.cavUserRef.id).toBe('cav-1');
            });
        }),
    );
    await firebase.assertSucceeds(
      offer1RefAsCav1
        .withConverter(OfferFirestoreConverter)
        .get()
        .then(doc => {
          expect(doc.exists).toBeTruthy();
        }),
    );
  });

  // Check this for more info: https://firebase.google.com/docs/firestore/security/rules-conditions
  it('Users cannot list the entire offers collection without a query on PIN or CAV', async () => {
    // Even though there is only data with pin-1 as the ref...
    const dbPin1 = authedApp({ uid: 'pin-1' });
    await firebase.assertFails(dbPin1.collection('offers').get());

    // Would fail anyways as all the records mention pin-1 as the ref...
    const dbPin2 = authedApp({ uid: 'pin-2' });
    await firebase.assertFails(dbPin2.collection('offers').get());
  });
});

describe('requests', () => {
  it('require users to log in before listing requests', async () => {
    const db = authedApp(null);
    const requests = db.collection('requests');
    await firebase.assertFails(requests.get());
  });
});

describe('questionnaires', () => {
  const createData = async () => {
    const db = adminApp();
    await firebase.assertSucceeds(
      db
        .collection('questionnaires')
        .doc('questionnaire-1')
        .set({
          parentRef: db.collection('users').doc('user-1'),
          data: { a: 1 },
          type: QuestionnaireType.pin,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          version: '1.0',
        }),
    );
  };

  it('require users to log in before listing questionnaires', async () => {
    const db = authedApp(null);
    const requests = db.collection('requests');
    await firebase.assertFails(requests.get());
  });

  it('only the current user can access their questionnaires', async () => {
    await createData();

    const userDb1 = authedApp({ uid: 'user-1' });
    const user1Questionnaire = userDb1
      .collection('questionnaires')
      .doc('questionnaire-1');
    await firebase.assertSucceeds(
      user1Questionnaire
        .withConverter(QuestionnaireFirestoreConverter)
        .get()
        .then(doc => {
          expect(doc.exists).toBeTruthy();
        }),
    );

    const userDb2 = authedApp({ uid: 'user-2' });
    const user1QuestionnaireAsUser2 = userDb2
      .collection('questionnaires')
      .doc('questionnaire-1');
    await firebase.assertFails(user1QuestionnaireAsUser2.get());
  });
});
