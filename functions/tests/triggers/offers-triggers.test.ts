import * as firebase from '@firebase/testing';
import * as Test from 'firebase-functions-test';
import * as fs from 'fs';
import { v4 as uuid } from 'uuid';

import { triggerEventsWhenOfferIsCreated } from '../../src/offers';
import { Offer, OfferStatus } from '../../src/models/offers';
import { Request, RequestStatus } from '../../src/models/requests';
import { ApplicationPreference, User } from '../../src/models/users';
import { removeObjectFromIndices, retrieveObjectFromIndex } from '../../src/algolia';
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

const cavUserId = uuid();

const cavUser = User.factory({
  displayPicture: null,
  displayName: 'newTestCavUser',
  applicationPreference: ApplicationPreference.cav,
  username: 'newTestCavUser',
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
});

afterEach(async () => {
  await removeObjectFromIndices(requestId);
});

describe('offer creation triggers', () => {
  // create separate instances for CAV and PIN
  const { db } = authedApp({ uid: cavUserId });

  it('should not keep invalid data', async () => {
    // create record of user to make request and user to make offer
    await Promise.all([
      db
        .collection('users')
        .doc(pinUserId)
        .set(pinUser.toObject()),
      db
        .collection('users')
        .doc(cavUserId)
        .set(cavUser.toObject()),
    ]);

    // create a valid request instane, we are testing offers so no need for invalid request
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

    // declare references to request and offer for easier access later
    const requestRef = db.collection('requests').doc(requestId);
    const offerRef = db.collection('offers').doc(offerId);

    return (
      requestRef
        .set(newRequest.toObject())
        // .then(() => new Promise(resolve => setTimeout(() => resolve(), 100)))
        .then(
          (): Promise<firebase.firestore.DocumentSnapshot> => {
            return requestRef.get();
          },
        )
        .then(snap => {
          // We need to execute request triggers to put data into algolia
          return test.wrap(triggerEventsWhenRequestIsCreated)(snap, {
            params: {
              userId: pinUserId,
              requestId: requestRef.id,
            },
          });
        })
        .then((): Promise<void> => offerRef.set({ displayName: 'sgsdg', cavUserSnapshot: cavUser.toObject(), pinUserSnapshot: pinUser.toObject() }))
        // .then(() => new Promise(resolve => setTimeout(() => resolve(), 100)))
        .then((): Promise<firebase.firestore.DocumentSnapshot> => offerRef.get())
        .then(snap => {
          // execute offer triggers
          return test.wrap(triggerEventsWhenOfferIsCreated)(snap, {
            params: {
              userId: cavUserId,
              offerId,
            },
          });
        })
        .then(() => {
          return offerRef.get();
        })
        .then(snapAfter => {
          expect(snapAfter.exists).toBeFalsy();
        })
    );
  });

  it('should not assosciate invalid offer with data in authenticatd request', async () => {
    // create record of user to make request and user to make offer
    await Promise.all([
      db
        .collection('users')
        .doc(pinUserId)
        .set(pinUser.toObject()),
      db
        .collection('users')
        .doc(cavUserId)
        .set(cavUser.toObject()),
    ]);

    // create a valid request instane, we are testing offers so no need for invalid request
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

    // declare references to request and offer for easier access later
    const requestRef = db.collection('requests').doc(requestId);
    const offerRef = db.collection('offers').doc(offerId);

    return (
      requestRef
        .set(newRequest.toObject())
        // .then(() => new Promise(resolve => setTimeout(() => resolve(), 100)))
        .then(
          (): Promise<firebase.firestore.DocumentSnapshot> => {
            return requestRef.get();
          },
        )
        .then(snap => {
          // We need to execute request triggers to put data into algolia
          return test.wrap(triggerEventsWhenRequestIsCreated)(snap, {
            params: {
              userId: pinUserId,
              requestId: requestRef.id,
            },
          });
        })
        .then(
          (): Promise<void> =>
            offerRef.set({
              displayName: 'sgsdg',
              cavUserSnapshot: cavUser.toObject(),
              pinUserSnapshot: pinUser.toObject(),
              requestRef: requestRef.id,
            }),
        )
        // .then(() => new Promise(resolve => setTimeout(() => resolve(), 100)))
        .then((): Promise<firebase.firestore.DocumentSnapshot> => offerRef.get())
        .then(snap => {
          // execute offer triggers
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
          // the cav shouldn't be added to the participant list when the offer is invalid
          // by default, the participatn list will have the pin so the length should be 1
          expect(snapAfter.participants.length).toBe(1);
        })
    );
  });

  it('should keep valid data', async () => {
    // create record of user to make request and user to make offer
    await Promise.all([
      db
        .collection('users')
        .doc(pinUserId)
        .set(pinUser.toObject()),
      db
        .collection('users')
        .doc(cavUserId)
        .set(cavUser.toObject()),
    ]);

    // create a valid request instane, we are testing offers so no need for invalid request
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

    // declare references to request and offer for easier access later
    const requestRef = db.collection('requests').doc(requestId);
    const offerRef = db.collection('offers').doc(offerId);

    return (
      requestRef
        .set(newRequest.toObject())
        // .then(() => new Promise(resolve => setTimeout(() => resolve(), 100)))
        .then(
          (): Promise<firebase.firestore.DocumentSnapshot> => {
            return requestRef.get();
          },
        )
        .then(snap => {
          // We need to execute request triggers to put data into algolia
          console.log('triggering request');
          return test.wrap(triggerEventsWhenRequestIsCreated)(snap, {
            params: {
              userId: pinUserId,
              requestId: requestRef.id,
            },
          });
        })
        .then(
          (): Promise<void> => {
            const newOffer = Offer.factory({
              cavUserRef: db.collection('users').doc(cavUserId) as any,
              cavUserSnapshot: cavUser,
              pinUserRef: db.collection('users').doc(pinUserId) as any,
              requestRef: db.collection('requests').doc(requestId) as any,
              requestSnapshot: newRequest,
              message: 'I want to help',
              status: OfferStatus.pending,
              createdAt: firebase.firestore.Timestamp.now(),
              updatedAt: firebase.firestore.Timestamp.now(),
            });
            return offerRef.set(newOffer.toObject());
          },
        )
        // .then(() => new Promise(resolve => setTimeout(() => resolve(), 100)))
        .then(
          (): Promise<firebase.firestore.DocumentSnapshot> => {
            return offerRef.get();
          },
        )
        .then(snap => {
          // execute offer triggers
          console.log('executin offer trigger');
          return test.wrap(triggerEventsWhenOfferIsCreated)(snap, {
            params: {
              userId: cavUserId,
              offerId,
            },
          });
        })
        .then(() => {
          return offerRef.get();
        })
        .then(snapAfter => {
          console.log('snapAfter.exists: ', snapAfter.exists);
          expect(snapAfter.exists).toBeTruthy();
        })
    );
  });

  it('should associate offer with data in algolia authenticated request', async () => {
    // create record of user to make request and user to make offer
    await Promise.all([
      db
        .collection('users')
        .doc(pinUserId)
        .set(pinUser.toObject()),
      db
        .collection('users')
        .doc(cavUserId)
        .set(cavUser.toObject()),
    ]);

    // create a valid request instane, we are testing offers so no need for invalid request
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

    // declare references to request and offer for easier access later
    const requestRef = db.collection('requests').doc(requestId);
    const offerRef = db.collection('offers').doc(offerId);

    return (
      requestRef
        .set(newRequest.toObject())
        // .then(() => new Promise(resolve => setTimeout(() => resolve(), 100)))
        .then(
          (): Promise<firebase.firestore.DocumentSnapshot> => {
            return requestRef.get();
          },
        )
        .then(snap => {
          // We need to execute request triggers to put data into algolia
          return test.wrap(triggerEventsWhenRequestIsCreated)(snap, {
            params: {
              userId: pinUserId,
              requestId: requestRef.id,
            },
          });
        })
        .then(
          (): Promise<void> => {
            const newOffer = Offer.factory({
              cavUserRef: db.collection('users').doc(cavUserId) as any,
              cavUserSnapshot: cavUser,
              pinUserRef: db.collection('users').doc(pinUserId) as any,
              requestRef: requestRef as any,
              requestSnapshot: newRequest,
              message: 'I want to help',
              status: OfferStatus.pending,
              createdAt: firebase.firestore.Timestamp.now(),
              updatedAt: firebase.firestore.Timestamp.now(),
            });
            return offerRef.set(newOffer.toObject());
          },
        )
        // .then(() => new Promise(resolve => setTimeout(() => resolve(), 100)))
        .then(
          (): Promise<firebase.firestore.DocumentSnapshot> => {
            return offerRef.get();
          },
        )
        .then(snap => {
          // execute offer triggers
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
          // the participant list should include both the pin and the cav
          expect(snapAfter.participants.length).toBe(2);
        })
    );
  });
});
