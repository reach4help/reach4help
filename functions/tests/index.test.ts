import * as dotenv from 'dotenv';
import * as Test from 'firebase-functions-test';

dotenv.config();

const firebaseConfig = {
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  projectId: process.env.FIREBASE_PROJECT_ID,
};
const pathToServiceAccountKey = `${__dirname}/../serviceAccountKey-dev.json`;
const firebaseFunctionsTest = Test(firebaseConfig, pathToServiceAccountKey);
firebaseFunctionsTest.mockConfig({
  algolia: {
    id: process.env.ALGOLIA_ID,
    key: process.env.ALGOLIA_KEY,
    requests_index: process.env.ALGOLIA_REQUESTS_INDEX, // eslint-disable-line @typescript-eslint/camelcase
  },
});

describe('Jest test suite for functions', () => {
  it('tests operational', () => {
    expect(1 + 1).toBe(2);
  });
});

export { firebaseFunctionsTest };
