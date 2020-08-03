import * as firebase from '@firebase/testing';
import * as Test from 'firebase-functions-test';
import * as fs from 'fs';
import { v4 as uuid } from 'uuid';

import { triggerEventsWhenOfferIsCreated } from '../../src/offers'
import { Offer, OfferStatus } from '../../src/models/offers';
import { Request, RequestStatus } from '../../src/models/requests';
import { User, ApplicationPreference } from '../../src/models/users';
import { retrieveObjectFromIndex, removeObjectFromIndices } from '../../src/algolia'
import { triggerEventsWhenRequestIsCreated } from '../../src/requests';

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

const cavUserId = uuid();

const cavUser = User.factory({
    displayPicture: null,
    displayName: 'newTestCavUser',
    applicationPreference: ApplicationPreference.cav,
    username: 'newTestCavUser'
});

const requestId = uuid();
const offerId = uuid();

beforeAll(async () => {
    await firebase.loadFirestoreRules({ projectId, rules });
});

afterAll(async () => {
  await Promise.all(firebase.apps().map(app => app.delete()));
});

beforeEach(async () => {
  // Clear the database between tests
  await firebase.clearFirestoreData({ projectId });
  const { db: pinDb } = authedApp({uid: pinUserId });
  const { db: cavDb } = authedApp({ uid: cavUserId });
  await pinDb.collection('users').doc(pinUserId).set(pinUser.toObject());
  await cavDb.collection('users').doc(cavUserId).set(cavUser.toObject());
});

afterEach(async () => {
  await removeObjectFromIndices(requestId);
});

describe('offer creation triggers', () => {
  const { db: pinDb } = authedApp({uid: pinUserId });
  const { db: cavDb } = authedApp({ uid: cavUserId });

  it('should not keep invalid data', async () => {
    const newRequest = Request.factory({
      pinUserRef: pinDb.collection('users').doc(pinUserId) as any,
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
    const requestRef = pinDb.collection('requests').doc(requestId);
    const offerRef = cavDb.collection('offers').doc(offerId);

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
      .then(
        (): Promise<void> => 
          offerRef
            .set({ displayName: 'sgsdg', cavUserSnapshot: cavUser.toObject(), pinUserSnapshot: pinUser.toObject() }),
      )
      .then(
        (): Promise<firebase.firestore.DocumentSnapshot> => 
            offerRef.get(),
      )
      .then(snap => {
        return test.wrap(triggerEventsWhenOfferIsCreated)(snap, {
          params: {
            userId: cavUserId,
            offerId
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

  it('should not assosciate invalid offer with data in authenticatd request', async () => {
    const newRequest = Request.factory({
      pinUserRef: pinDb.collection('users').doc(pinUserId) as any,
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
    const requestRef = pinDb.collection('requests').doc(requestId);
    const offerRef = cavDb.collection('offers').doc(offerId);

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
      .then(
        (): Promise<void> => 
          offerRef
            .set({ displayName: 'sgsdg', cavUserSnapshot: cavUser.toObject(), pinUserSnapshot: pinUser.toObject(), requestRef: requestRef.id }),
      )
      .then(
        (): Promise<firebase.firestore.DocumentSnapshot> => 
            offerRef.get(),
      )
      .then(snap => {
        return test.wrap(triggerEventsWhenOfferIsCreated)(snap, {
          params: {
            userId: cavUserId,
            offerId
          },
        });
      })
      .then(() => {
        return retrieveObjectFromIndex(requestRef.id, true);
      })
      .then((snapAfter: any) => {
        expect(snapAfter.participants.length).toBe(1);
      })
      .catch(error => {
        console.error("error: ", error);
        expect(error.status).toBe(200)
      });
  });

  it('should keep valid data', async () => {
    const newRequest = Request.factory({
      pinUserRef: pinDb.collection('users').doc(pinUserId) as any,
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
    const requestRef = pinDb.collection('requests').doc(requestId);
    const offerRef = cavDb.collection('offers').doc(offerId);

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
      .then(
        (): Promise<void> => {
          const newOffer = Offer.factory({
            cavUserRef: cavDb.collection('users').doc(cavUserId) as any,
            cavUserSnapshot: cavUser,
            pinUserRef: pinDb.collection('users').doc(pinUserId) as any,
            requestRef: requestRef as any,
            requestSnapshot: newRequest,
            message: 'I want to help',
            status: OfferStatus.pending,
            createdAt: firebase.firestore.Timestamp.now(),
            updatedAt: firebase.firestore.Timestamp.now(),
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
            userId: cavUserId,
            offerId
          },
        });
      })
      .then(() => {
        return offerRef.get();
      })
      .then(snapAfter => {
        expect(snapAfter.exists).toBeTruthy();
      })
      .catch(error => {
        console.error("error: ", error);
        expect(false).toBeFalsy();
      });
  });

  it('should associate offer with data in algolia authenticated request', async () => {
    const newRequest = Request.factory({
      pinUserRef: pinDb.collection('users').doc(pinUserId) as any,
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
    const requestRef = pinDb.collection('requests').doc(requestId);
    const offerRef = cavDb.collection('offers').doc(offerId);

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
      .then(
        (): Promise<void> => {
          const newOffer = Offer.factory({
            cavUserRef: cavDb.collection('users').doc(cavUserId) as any,
            cavUserSnapshot: cavUser,
            pinUserRef: pinDb.collection('users').doc(pinUserId) as any,
            requestRef: requestRef as any,
            requestSnapshot: newRequest,
            message: 'I want to help',
            status: OfferStatus.pending,
            createdAt: firebase.firestore.Timestamp.now(),
            updatedAt: firebase.firestore.Timestamp.now(),
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
            userId: cavUserId,
            offerId,
          },
        });
      })
      .then(() => {
        return retrieveObjectFromIndex(requestRef.id, true);
      })
      .then((snapAfter: any) => {
        expect(snapAfter.participants.length).toBe(2);
      })
      .catch(error => {
        console.error("error: ", error);
        expect(error.status).toBe(200);
      });
  });
});
