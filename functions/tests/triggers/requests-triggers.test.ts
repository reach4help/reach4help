import * as firebase from '@firebase/testing';

const projectId = 'reach-4-help-test';

/**
 * Creates a new app with admin authentication.
 *
 * @return {object} the app.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const adminApp = () => {
  return firebase.initializeAdminApp({ projectId }).firestore();
};

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