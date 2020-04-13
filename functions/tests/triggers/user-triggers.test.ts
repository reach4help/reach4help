import * as firebase from '@firebase/testing';
import * as fs from 'fs';
import { User, UserFirestoreConverter } from '../../src/models/users';

const projectId = 'reach-4-help-test';

const rules = fs.readFileSync(
  `${__dirname}/../../../firebase/firestore.rules`,
  'utf8',
);

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

describe.skip('user triggers', () => {
  it('should delete invalid data', async () => {
    const db = authedApp({ uid: 'user-1' });
    const ref = db.collection('users').doc('user-1');
    await
      ref
        .withConverter(UserFirestoreConverter)
        .set(User.factory({
            username: 'test_user',
          }),
        );

    const snapshot = await ref.get();

    // Doesn't actually work.
    await (async () => {
      return new Promise(resolve => {
        setTimeout(() => {
          expect(snapshot.exists).toBeFalsy();
          resolve();
        }, 3000);
      });
    })();
  });
});
