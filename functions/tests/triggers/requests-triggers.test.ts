import * as firebase from '@firebase/testing';
import * as Test from 'firebase-functions-test';
import * as fs from 'fs';
import { v4 as uuid } from 'uuid';

import { triggerEventsWhenRequestIsCreated } from '../../src/requests'
import { User, ApplicationPreference } from '../../src/models/users';
import { Request, RequestStatus } from '../../src/models/requests';
import { retrieveObjectFromIndex, removeObjectFromIndices } from '../../src/algolia'

const projectId = 'reach-4-help-test';

const test = Test();


const rules = fs.readFileSync(`${__dirname}/dummy.rules`, 'utf8');

/**
 * Creates a new app with specified user authentication.
 *
 * @return {object} the app.
 */
const authedApp = (auth?: object) => {
  const app = firebase.initializeTestApp({ projectId, auth })
  return {
      app,
      db: app.firestore()
  }
};

const pinUserId = uuid();

const pinUser = User.factory({
  displayPicture: null,
  displayName: 'newtestuser',
  applicationPreference: ApplicationPreference.pin,
  username: 'newtestuser'
});

const requestId = uuid();

beforeAll(async () => {
  await firebase.loadFirestoreRules({ projectId, rules });
});

afterAll(async () => {
  await Promise.all(firebase.apps().map(app => app.delete()));
});

beforeEach(async () => {
  // Clear the database between tests
  await firebase.clearFirestoreData({ projectId });
});

afterEach(async () => {
  await removeObjectFromIndices(requestId);
});

describe('request creation triggers', () => {
  const { db } = authedApp({ uid: pinUserId });

  it('should delete invalid data', async () => {

    await db.collection('users').doc(pinUserId).set(pinUser.toObject())

    const requestRef = db.collection('requests').doc(requestId);

    return requestRef
      .set({ displayName: 'fsdfs', pinUserSnapshot: pinUser.toObject() })
      .then(
        (): Promise<firebase.firestore.DocumentSnapshot> => {
          return requestRef.get();
        },
      )
      .then(snap => {
        return test.wrap(triggerEventsWhenRequestIsCreated)(snap, {
          params: {
            userId: pinUserId,
            requestId: requestRef.id
          },
        });
      })
      .then(() => {
        return requestRef.get();
      })
      .then(snapAfter => {
        expect(snapAfter.exists).toBeFalsy();
      })
  });

  it('should not add invalid data in algolia unauthenticated request', async () => {

    await db.collection('users').doc(pinUserId).set(pinUser.toObject())

    const requestRef = db.collection('requests').doc(requestId);

    return requestRef
      .set({ displayName: 'fsdfs', pinUserSnapshot: pinUser.toObject() })
      .then(
        (): Promise<firebase.firestore.DocumentSnapshot> => {
          return requestRef.get();
        },
      )
      .then(snap => {
        return test.wrap(triggerEventsWhenRequestIsCreated)(snap, {
          params: {
            userId: pinUserId,
            requestId: requestRef.id
          },
        });
      })
      .then(() => {
        return retrieveObjectFromIndex(requestRef.id, false);
      })
      .then(() => expect(false).toBeTruthy())
      .catch(error => expect(error.status).toBe(404));
  });

  it('should not add invalid data in algolia authenticated request', async () => {

    await db.collection('users').doc(pinUserId).set(pinUser.toObject())

    const requestRef = db.collection('requests').doc(requestId);

    return requestRef
      .set({ displayName: 'fsdfs', pinUserSnapshot: pinUser.toObject() })
      .then(
        (): Promise<firebase.firestore.DocumentSnapshot> => {
          return requestRef.get();
        },
      )
      .then(snap => {
        return test.wrap(triggerEventsWhenRequestIsCreated)(snap, {
          params: {
            userId: pinUserId,
            requestId: requestRef.id
          },
        });
      })
      .then(() => {
        return retrieveObjectFromIndex(requestRef.id, true);
      })
      .then(() => expect(false).toBeTruthy())
      .catch(error => expect(error.status).toBe(404));
  });

  it('should keep valid data', async () => {

    await db.collection('users').doc(pinUserId).set(pinUser.toObject())

    const newRequest = Request.factory({
      pinUserRef: db.collection('users').doc(pinUserId) as any,
      pinUserSnapshot: pinUser,
      title: 'new reqeust',
      description: 'new request description',
      latLng: new firebase.firestore.GeoPoint(0,0),
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
    })

    const requestRef = db.collection('requests').doc(requestId);

    return requestRef
      .set(newRequest.toObject())
      .then(
        (): Promise<firebase.firestore.DocumentSnapshot> => {
          return requestRef.get();
        },
      )
      .then(snap => {
        return test.wrap(triggerEventsWhenRequestIsCreated)(snap, {
          params: {
            userId: pinUserId,
            requestId: requestRef.id
          },
        });
      })
      .then(() => {
        return requestRef.get();
      })
      .then(snapAfter => {
        expect(snapAfter.exists).toBeTruthy();
      })
      .catch(error => console.error("error occured: ", error));
  });

  it('should add valid data in algolia unauthenticated request', async () => {

    await db.collection('users').doc(pinUserId).set(pinUser.toObject())

    const requestRef = db.collection('requests').doc(requestId);

    const newRequest = Request.factory({
      pinUserRef: db.collection('users').doc(pinUserId) as any,
      pinUserSnapshot: pinUser,
      title: 'new reqeust',
      description: 'new request description',
      latLng: new firebase.firestore.GeoPoint(0,0),
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
    })

    return requestRef
      .set(newRequest.toObject())
      .then(
        (): Promise<firebase.firestore.DocumentSnapshot> => {
          return requestRef.get();
        },
      )
      .then(snap => {
        return test.wrap(triggerEventsWhenRequestIsCreated)(snap, {
          params: {
            userId: pinUserId,
            requestId: requestRef.id
          },
        });
      })
      .then(() => {
        return new Promise((resolve, reject) => {
          setTimeout(async () => {
            try {
              let result = await retrieveObjectFromIndex(requestRef.id, false);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          }, 150)
        });
      })
      .then((snapAfter: any) => {
        expect(snapAfter.objectID).toBe(requestId);
      })
      .catch(error => {
        console.error("error: ", error);
        expect(error.status).toBe(200)
      });
  });

  it('should add valid data in algolia authenticated request', async () => {

    await db.collection('users').doc(pinUserId).set(pinUser.toObject())

    const requestRef = db.collection('requests').doc(requestId);

    const newRequest = Request.factory({
      pinUserRef: db.collection('users').doc(pinUserId) as any,
      pinUserSnapshot: pinUser,
      title: 'new reqeust',
      description: 'new request description',
      latLng: new firebase.firestore.GeoPoint(0,0),
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
    })

    return requestRef
      .set(newRequest.toObject())
      .then(
        (): Promise<firebase.firestore.DocumentSnapshot> => {
          return requestRef.get();
        },
      )
      .then(snap => {
        return test.wrap(triggerEventsWhenRequestIsCreated)(snap, {
          params: {
            userId: pinUserId,
            requestId: requestRef.id
          },
        });
      })
      .then(() => {
        return retrieveObjectFromIndex(requestRef.id, true);
      })
      .then(snapAfter => {
        expect(snapAfter.objectID).toBe(requestId);
      })
      .catch(error => expect(error.status).toBe(200));
  });
});
