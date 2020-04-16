import { triggerEventsWhenUserIsCreated } from '../../src/users/index'
import * as firebase from '@firebase/testing';
import * as fs from 'fs';
import * as Test from 'firebase-functions-test';

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

const test = Test();

describe('user triggers', () => {
  it('should delete invalid data', async () => {
    const db = adminApp();
    let userRef = db.collection('users').doc('user1');
    
    return userRef.set({username: 'fsdfs'})
    .then(result=>{
      return userRef.get()
    })
    .then(snap=>{
        console.log("snap.data: ", JSON.stringify(snap.data()));

        let wrapped = test.wrap(triggerEventsWhenUserIsCreated);

        return wrapped(snap) 
    })
    .then(()=>{
          
      return userRef.get()
      
    })
    .then(snapAfter=>{
      console.log("snapAfter: ", snapAfter.data());
      expect(snapAfter.exists).toBeFalsy();
    })

  });
});
