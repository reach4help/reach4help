import * as firebase from '@firebase/testing';
import * as Test from 'firebase-functions-test';

import { triggerEventsWhenOfferIsCreated } from '../../src/offers'
import { Offer, OfferStatus } from '../../src/models/offers';
import { Request, RequestStatus } from '../../src/models/requests';
import { User, ApplicationPreference } from '../../src/models/users';
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

const cavUser = User.factory({
    displayPicture: '',
    displayName: 'newTestCavUser',
    applicationPreference: ApplicationPreference.cav,
    username: 'newTestCavUser'
  });

afterAll(async () => {
  await Promise.all(firebase.apps().map(app => app.delete()));
});

beforeEach(async () => {
  // Clear the database between tests
  await firebase.clearFirestoreData({ projectId });
  const { db: db1 } = authedApp({uid: '1234'});
  const { db: db2 } = authedApp({ uid: '12345' });
  await db1.collection('users').doc('1234').set(pinUser.toObject());
  await db2.collection('users').doc('12345').set(cavUser.toObject());
});

describe('offer creation triggers', () => {
  const { db: db1 } = authedApp({ uid: '1234' });
  const { db: db2 } = authedApp({ uid: '12345' });

  it('should not keep invalid data', async () => {
    const newRequest = Request.factory({
      pinUserRef: db1.collection('users').doc('1234') as any,
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
    const requestRef = db1.collection('requests').doc('request-1');
    const offerRef = db2.collection('offers').doc('offer-1');

    return requestRef
      .set(newRequest.toObject())
      .then(
        (): Promise<void> => 
            offerRef
                .set({ displayName: 'sgsdg'}),
      )
      .then(
        (): Promise<firebase.firestore.DocumentSnapshot> => 
            offerRef.get(),
      )
      .then(snap => {
        return test.wrap(triggerEventsWhenOfferIsCreated)(snap, {
          params: {
            userId: '12345',
          },
        });
      })
      .then(() => {
        return offerRef.get();
      })
      .then(snapAfter => {
        expect(snapAfter.exists).toBeFalsy();
      });
  });

  it('should not update invalid data in unauthenticatd algolia indices', async () => {
    const newRequest = Request.factory({
      pinUserRef: db1.collection('users').doc('1234') as any,
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
    const requestRef = db1.collection('requests').doc('request-1');
    const offerRef = db2.collection('offers').doc('offer-1');

    return requestRef
      .set(newRequest.toObject())
      .then(
        (): Promise<void> => 
            offerRef
                .set({ displayName: 'sgsdg'}),
      )
      .then(
        (): Promise<firebase.firestore.DocumentSnapshot> => 
            offerRef.get(),
      )
      .then(snap => {
        return test.wrap(triggerEventsWhenOfferIsCreated)(snap, {
          params: {
            userId: '12345',
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

  it('should not update invalid data in authenticatd algolia indices', async () => {
    const newRequest = Request.factory({
      pinUserRef: db1.collection('users').doc('1234') as any,
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
    const requestRef = db1.collection('requests').doc('request-1');
    const offerRef = db2.collection('offers').doc('offer-1');

    return requestRef
      .set(newRequest.toObject())
      .then(
        (): Promise<void> => 
            offerRef
                .set({ displayName: 'sgsdg'}),
      )
      .then(
        (): Promise<firebase.firestore.DocumentSnapshot> => 
            offerRef.get(),
      )
      .then(snap => {
        return test.wrap(triggerEventsWhenOfferIsCreated)(snap, {
          params: {
            userId: '12345',
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
      pinUserRef: db1.collection('users').doc('1234') as any,
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
    const requestRef = db1.collection('requests').doc('request-1');
    const offerRef = db2.collection('offers').doc('offer-1');

    return requestRef
      .set(newRequest.toObject())
      .then(
        (): Promise<void> => {
          const newOffer = Offer.factory({
              cavUserRef: db2.collection('users').doc('12345') as any,
              cavUserSnapshot: cavUser,
              pinUserRef: db1.collection('users').doc('1234') as any,
              requestRef: requestRef as any,
              requestSnapshot: newRequest,
              message: 'I want to help',
              status: OfferStatus.pending
          });
          return offerRef
            .set(newOffer.toObject())
        },
      )
      .then(
        (): Promise<firebase.firestore.DocumentSnapshot> => {
            return offerRef.get();
        },
      )
      .then(snap => {
        return test.wrap(triggerEventsWhenOfferIsCreated)(snap, {
          params: {
            userId: '12345',
          },
        });
      })
      .then(() => {
        return offerRef.get();
      })
      .then(snapAfter => {
        expect(snapAfter.exists).toBeTruthy();
      });
  });

  it('should add valid data in algolia unauthenticated request', async () => {
    const newRequest = Request.factory({
      pinUserRef: db1.collection('users').doc('1234') as any,
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
    const requestRef = db1.collection('requests').doc('request-1');
    const offerRef = db2.collection('offers').doc('offer-1');

    return requestRef
      .set(newRequest.toObject())
      .then(
        (): Promise<void> => {
          const newOffer = Offer.factory({
              cavUserRef: db2.collection('users').doc('12345') as any,
              cavUserSnapshot: cavUser,
              pinUserRef: db1.collection('users').doc('1234') as any,
              requestRef: requestRef as any,
              requestSnapshot: newRequest,
              message: 'I want to help',
              status: OfferStatus.pending
          });
          return offerRef
            .set(newOffer.toObject())
        },
      )
      .then(
        (): Promise<firebase.firestore.DocumentSnapshot> => {
            return offerRef.get();
        },
      )
      .then(snap => {
        return test.wrap(triggerEventsWhenOfferIsCreated)(snap, {
          params: {
            userId: '12345',
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
    const newRequest = Request.factory({
      pinUserRef: db1.collection('users').doc('1234') as any,
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
    const requestRef = db1.collection('requests').doc('request-1');
    const offerRef = db2.collection('offers').doc('offer-1');

    return requestRef
      .set(newRequest.toObject())
      .then(
        (): Promise<void> => {
          const newOffer = Offer.factory({
              cavUserRef: db2.collection('users').doc('12345') as any,
              cavUserSnapshot: cavUser,
              pinUserRef: db1.collection('users').doc('1234') as any,
              requestRef: requestRef as any,
              requestSnapshot: newRequest,
              message: 'I want to help',
              status: OfferStatus.pending
          });
          return offerRef
            .set(newOffer.toObject())
        },
      )
      .then(
        (): Promise<firebase.firestore.DocumentSnapshot> => {
            return offerRef.get();
        },
      )
      .then(snap => {
        return test.wrap(triggerEventsWhenOfferIsCreated)(snap, {
          params: {
            userId: '12345',
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
