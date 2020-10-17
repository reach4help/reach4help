import * as firebase from '@firebase/testing';
import * as Test from 'firebase-functions-test';
import * as fs from 'fs';
import { v4 as uuid } from 'uuid';

import { triggerEventsWhenRequestIsCreated } from '../../src/requests';
import { ApplicationPreference, User } from '../../src/models/users';
import { Request, RequestStatus } from '../../src/models/requests';
import { removeObjectFromIndices, retrieveObjectFromIndex } from '../../src/algolia';

const projectId = 'reach-4-help-test';

const test = Test();

const rules = fs.readFileSync(`${__dirname}/dummy.rules`, 'utf8');

/**
 * Creates a new app with specified user authentication.
 *
 * @return {object} the app.
 */
const authedApp = (auth?: object) => {
  const app = firebase.initializeTestApp({ projectId, auth });
  return {
    app,
    db: app.firestore(),
  };
};

const pinUserId = uuid();

const pinUser = User.factory({
  displayPicture: null,
  displayName: 'newtestuser',
  applicationPreference: ApplicationPreference.pin,
  username: 'newtestuser',
});

const requestId = uuid();

beforeAll(async () => {
  // To allow reads and writes from authed db
  await firebase.loadFirestoreRules({ projectId, rules });
});

afterAll(async () => {
  // clear all app instances
  await Promise.all(firebase.apps().map(app => app.delete()));
});

beforeEach(async () => {
  // Clear the database between tests
  await firebase.clearFirestoreData({ projectId });
});

afterEach(async () => {
  // Don't keep adding data into test indices, use it temporarily
  await removeObjectFromIndices(requestId);
});

describe('request creation triggers', () => {
  const { db } = authedApp({ uid: pinUserId });

  it('should delete invalid data', async () => {
    // create record of user who makes request
    await db
      .collection('users')
      .doc(pinUserId)
      .set(pinUser.toObject());

    // declare a requestRef to which writes should be made to simplify access later
    const requestRef = db.collection('requests').doc(requestId);

    return requestRef
      .set({ displayName: 'fsdfs', pinUserSnapshot: pinUser.toObject() })
      .then(
        (): Promise<firebase.firestore.DocumentSnapshot> => {
          return requestRef.get();
        },
      )
      .then(snap => {
        // Execute the trigger on the request object on firestore
        return test.wrap(triggerEventsWhenRequestIsCreated)(snap, {
          params: {
            userId: pinUserId,
            requestId: requestRef.id,
          },
        });
      })
      .then(() => {
        return requestRef.get();
      })
      .then(snapAfter => {
        expect(snapAfter.exists).toBeFalsy();
      });
  });

  it('should keep valid data', async () => {
    // create record of user who makes request
    await db
      .collection('users')
      .doc(pinUserId)
      .set(pinUser.toObject());

    // create a properly filled and acceptable request object
    const newRequest = Request.factory({
      pinUserRef: db.collection('users').doc(pinUserId) as any,
      pinUserSnapshot: pinUser,
      title: 'new reqeust',
      description: 'new request description',
      latLng: new firebase.firestore.GeoPoint(0, 0),
      streetAddress: 'new request street address',
      offerCount: 0,
      rejectionCount: 0,
      firstOfferMade: null,
      firstRejectionMade: null,
      lastOfferMade: null,
      lastRejectionMade: null,
      status: RequestStatus.pending,
      createdAt: firebase.firestore.Timestamp.now(),
      updatedAt: firebase.firestore.Timestamp.now(),
    });

    // declare a requestRef to which writes should be made to simplify access later
    const requestRef = db.collection('requests').doc(requestId);

    return requestRef
      .set(newRequest.toObject())
      .then(
        (): Promise<firebase.firestore.DocumentSnapshot> => {
          return requestRef.get();
        },
      )
      .then(snap => {
        // Execute the trigger on the request object on firestore
        console.log('executing request triggers');
        return test.wrap(triggerEventsWhenRequestIsCreated)(snap, {
          params: {
            userId: pinUserId,
            requestId: requestRef.id,
          },
        });
      })
      .then(() => {
        return requestRef.get();
      })
      .then(snapAfter => {
        console.log('snapAfter.exists: ', snapAfter.exists);
        expect(snapAfter.exists).toBeTruthy();
      });
  });
});

describe('request creation effects on algolia unauthenticated request', () => {
  const { db } = authedApp({ uid: pinUserId });

  it('should not add invalid data', async () => {
    // create record of user who makes request
    await db
      .collection('users')
      .doc(pinUserId)
      .set(pinUser.toObject());

    // declare a requestRef to which writes should be made to simplify access later
    const requestRef = db.collection('requests').doc(requestId);

    return (
      requestRef
        .set({ displayName: 'fsdfs', pinUserSnapshot: pinUser.toObject() })
        .then(
          (): Promise<firebase.firestore.DocumentSnapshot> => {
            return requestRef.get();
          },
        )
        .then(snap => {
          // Execute the trigger on the request object on firestore
          return test.wrap(triggerEventsWhenRequestIsCreated)(snap, {
            params: {
              userId: pinUserId,
              requestId: requestRef.id,
            },
          });
        })
        .then(() => {
          // Try to read the request from algolia
          return retrieveObjectFromIndex(requestRef.id, false);
        })
        // Trigger shouldn't add incorrect data into algolia so the above request must fail
        .then(() => expect(false).toBeTruthy())
        .catch(error => expect(error.status).toBe(404))
    );
  });

  it('should add valid data', async () => {
    // create record of user who makes request
    await db
      .collection('users')
      .doc(pinUserId)
      .set(pinUser.toObject());

    // declare a requestRef to which writes should be made to simplify access later
    const requestRef = db.collection('requests').doc(requestId);

    // create a properly filled and acceptable request object
    const newRequest = Request.factory({
      pinUserRef: db.collection('users').doc(pinUserId) as any,
      pinUserSnapshot: pinUser,
      title: 'new reqeust',
      description: 'new request description',
      latLng: new firebase.firestore.GeoPoint(0, 0),
      streetAddress: 'new request street address',
      offerCount: 0,
      rejectionCount: 0,
      firstOfferMade: null,
      firstRejectionMade: null,
      lastOfferMade: null,
      lastRejectionMade: null,
      status: RequestStatus.pending,
      createdAt: firebase.firestore.Timestamp.now(),
      updatedAt: firebase.firestore.Timestamp.now(),
    });

    return (
      requestRef
        .set(newRequest.toObject())
        .then(
          (): Promise<firebase.firestore.DocumentSnapshot> => {
            return requestRef.get();
          },
        )
        .then(snap => {
          // Execute the trigger on the request object on firestore
          return test.wrap(triggerEventsWhenRequestIsCreated)(snap, {
            params: {
              userId: pinUserId,
              requestId: requestRef.id,
            },
          });
        })
        .then(() => {
          return retrieveObjectFromIndex(requestRef.id, false);
        })
        // since data is correct, the request should be present in algolia indexed with requestId as the objectId
        .then((snapAfter: any) => {
          expect(snapAfter.objectID).toBe(requestId);
        })
    );
  });
});

describe('request creation effects on algolia authenticated request', () => {
  const { db } = authedApp({ uid: pinUserId });

  it('should not add invalid data', async () => {
    // create record of user who makes request
    await db
      .collection('users')
      .doc(pinUserId)
      .set(pinUser.toObject());

    // declare a requestRef to which writes should be made to simplify access later
    const requestRef = db.collection('requests').doc(requestId);

    return (
      requestRef
        .set({ displayName: 'fsdfs', pinUserSnapshot: pinUser.toObject() })
        .then(
          (): Promise<firebase.firestore.DocumentSnapshot> => {
            return requestRef.get();
          },
        )
        .then(snap => {
          // Execute the trigger on the request object on firestore
          return test.wrap(triggerEventsWhenRequestIsCreated)(snap, {
            params: {
              userId: pinUserId,
              requestId: requestRef.id,
            },
          });
        })
        .then(() => {
          // Try to read the request from algolia
          return retrieveObjectFromIndex(requestRef.id, true);
        })
        // Trigger shouldn't add incorrect data into algolia so the above request must fail
        .then(() => expect(false).toBeTruthy())
        .catch(error => expect(error.status).toBe(404))
    );
  });

  it('should add valid data', async () => {
    // create record of user who creates request
    await db
      .collection('users')
      .doc(pinUserId)
      .set(pinUser.toObject());

    // declare a requestRef to which writes should be made to simplify access later
    const requestRef = db.collection('requests').doc(requestId);

    // create a properly filled and acceptable request object
    const newRequest = Request.factory({
      pinUserRef: db.collection('users').doc(pinUserId) as any,
      pinUserSnapshot: pinUser,
      title: 'new reqeust',
      description: 'new request description',
      latLng: new firebase.firestore.GeoPoint(0, 0),
      streetAddress: 'new request street address',
      offerCount: 0,
      rejectionCount: 0,
      firstOfferMade: null,
      firstRejectionMade: null,
      lastOfferMade: null,
      lastRejectionMade: null,
      status: RequestStatus.pending,
      createdAt: firebase.firestore.Timestamp.now(),
      updatedAt: firebase.firestore.Timestamp.now(),
    });

    return (
      requestRef
        .set(newRequest.toObject())
        .then(
          (): Promise<firebase.firestore.DocumentSnapshot> => {
            return requestRef.get();
          },
        )
        .then(snap => {
          // Execute the trigger on the request object on firestore
          return test.wrap(triggerEventsWhenRequestIsCreated)(snap, {
            params: {
              userId: pinUserId,
              requestId: requestRef.id,
            },
          });
        })
        .then(() => {
          return retrieveObjectFromIndex(requestRef.id, true);
        })
        // since data is correct, the request should be present in algolia indexed with requestId as the objectId
        .then(snapAfter => {
          expect(snapAfter.objectID).toBe(requestId);
        })
    );
  });
});
