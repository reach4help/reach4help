import * as firebase from '@firebase/testing';
import * as Test from 'firebase-functions-test';

import { triggerEventsWhenRequestIsCreated } from '../../src/requests'
import { User, ApplicationPreference } from '../../src/models/users';
import { Request, RequestStatus } from '../../src/models/requests';
import { retrieveObjectFromIndex } from '../../src/algolia'

const projectId = 'reach-4-help-test';

const test = Test();

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

const pinUser = User.factory({
  displayPicture: '',
  displayName: 'newtestuser',
  applicationPreference: ApplicationPreference.pin,
  username: 'newtestuser'
});

afterAll(async () => {
  await Promise.all(firebase.apps().map(app => app.delete()));
});

beforeEach(async () => {
  // Clear the database between tests
  await firebase.clearFirestoreData({ projectId });
  const { db } = authedApp({uid: '1234'});
  await db.collection('users').doc('1234').set(pinUser.toObject());
});

describe('request creation triggers', () => {
  const { db } = authedApp({ uid: '1234' });

  it('should delete invalid data', async () => {
    const requestRef = db.collection('requests').doc('request-1');

    return requestRef
      .set({ displayName: 'fsdfs' })
      .then(
        (): Promise<firebase.firestore.DocumentSnapshot> => {
          return requestRef.get();
        },
      )
      .then(snap => {
        return test.wrap(triggerEventsWhenRequestIsCreated)(snap, {
          params: {
            userId: '1234',
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

  it('should not add invalid data in algolia unauthenticated request', async () => {
    const requestRef = db.collection('requests').doc('request-1');

    return requestRef
      .set({ displayName: 'fsdfs' })
      .then(
        (): Promise<firebase.firestore.DocumentSnapshot> => {
          return requestRef.get();
        },
      )
      .then(snap => {
        return test.wrap(triggerEventsWhenRequestIsCreated)(snap, {
          params: {
            userId: '1234',
          },
        });
      })
      .then(() => {
        return retrieveObjectFromIndex(requestRef.id, false);
      })
      .then(snapAfter => {
        console.log("snapAfter: ", snapAfter);
        expect(snapAfter).toBeFalsy();
      });
  });

  it('should not add invalid data in algolia authenticated request', async () => {
    const requestRef = db.collection('requests').doc('request-1');

    return requestRef
      .set({ displayName: 'fsdfs' })
      .then(
        (): Promise<firebase.firestore.DocumentSnapshot> => {
          return requestRef.get();
        },
      )
      .then(snap => {
        return test.wrap(triggerEventsWhenRequestIsCreated)(snap, {
          params: {
            userId: '1234',
          },
        });
      })
      .then(() => {
        return retrieveObjectFromIndex(requestRef.id, true);
      })
      .then(snapAfter => {
        console.log("snapAfter: ", snapAfter);
        expect(snapAfter).toBeFalsy();
      });
  });

  it('should keep valid data', async () => {
    const newRequest = Request.factory({
      pinUserRef: db.collection('users').doc('1234') as any,
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
      status: RequestStatus.pending
    })
    const requestRef = db.collection('requests').doc('request-1');

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
            userId: '1234',
          },
        });
      })
      .then(() => {
        return requestRef.get();
      })
      .then(snapAfter => {
        expect(snapAfter.exists).toBeTruthy();
      });
  });

  it('should add valid data in algolia unauthenticated request', async () => {
    const requestRef = db.collection('requests').doc('request-1');

    const newRequest = Request.factory({
      pinUserRef: db.collection('users').doc('1234') as any,
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
      status: RequestStatus.pending
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
            userId: '1234',
          },
        });
      })
      .then(() => {
        return retrieveObjectFromIndex(requestRef.id, false);
      })
      .then(snapAfter => {
        console.log("snapAfter: ", snapAfter);
        expect(snapAfter).toBeFalsy();
      });
  });

  it('should add valid data in algolia authenticated request', async () => {
    const requestRef = db.collection('requests').doc('request-1');

    const newRequest = Request.factory({
      pinUserRef: db.collection('users').doc('1234') as any,
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
      status: RequestStatus.pending
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
            userId: '1234',
          },
        });
      })
      .then(() => {
        return retrieveObjectFromIndex(requestRef.id, true);
      })
      .then(snapAfter => {
        console.log("snapAfter: ", snapAfter);
        expect(snapAfter).toBeFalsy();
      });
  });
});
