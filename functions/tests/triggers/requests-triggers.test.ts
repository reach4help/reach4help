import * as firebase from '@firebase/testing';
import * as fs from 'fs';

const projectId = 'reach-4-help-test';

const rules = fs.readFileSync(
  `${__dirname}/../../../firebase/firestore.rules`,
  'utf8',
);

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

describe('request creation triggers', () => {
    const db = adminApp();
    it('should delete invalid data', async () => {
        const ref = db.collection('requests').doc('request-1');
        await
        ref
        .set({
            displayName: 'sdd'
        });
    })
});