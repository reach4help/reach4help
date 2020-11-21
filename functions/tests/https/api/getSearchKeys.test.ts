import * as firebase from '@firebase/testing';
import algoliasearch from 'algoliasearch';
import * as Test from 'firebase-functions-test';
import * as functions from 'firebase-functions';
import * as fs from 'fs';
import { v4 as uuid } from 'uuid';

import { triggerEventsWhenRequestIsCreated } from '../../../src/requests';
import { ApplicationPreference, User } from '../../../src/models/users';
import { Request, RequestStatus } from '../../../src/models/requests';
import { removeObjectFromIndices } from '../../../src/algolia';
import { getSearchKey, IgetSearchKeyReturn } from '../../../src/https/api/search/getSearchKeys';

const projectId = 'reach-4-help-test';

const test = Test();
const ALGOLIA_ID = functions.config().algolia.id;
const ALGOLIA_UNAUTHENTICATEDREQUESTS_INDEX = functions.config().algolia.unauthenticated_requests_index;
const ALGOLIA_GENERALREQUESTS_INDEX = functions.config().algolia.general_requests_index;

const getSearchKeyWrapped = test.wrap(getSearchKey);

const rules = fs.readFileSync(`${__dirname}/../../dummy.rules`, 'utf8');

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

describe('Unauthenticated users to find posts', () => {
  const { db } = authedApp({ uid: pinUserId });

  it('should allow searching unauthenticated posts index using restricted key', async () => {
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

    await requestRef.set(newRequest.toObject());
    const snap = await requestRef.get();
    // Execute the trigger on the request object on firestore
    await test.wrap(triggerEventsWhenRequestIsCreated)(snap, {
      params: {
        userId: pinUserId,
        requestId: requestRef.id,
      },
    });
    const newSearchKey: IgetSearchKeyReturn = getSearchKeyWrapped(undefined);
    const client = algoliasearch(ALGOLIA_ID, newSearchKey.searchKey);
    const index = client.initIndex(ALGOLIA_UNAUTHENTICATEDREQUESTS_INDEX);
    const { hits } = await index.search('new request');
    expect(hits.length).toBeTruthy();
  });
});

describe('Authenticated users to find posts', () => {
  const { db } = authedApp({ uid: pinUserId });

  it('should allow searching general posts index using restricted key', async () => {
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

    await requestRef.set(newRequest.toObject());
    const snap = await requestRef.get();
    // Execute the trigger on the request object on firestore
    await test.wrap(triggerEventsWhenRequestIsCreated)(snap, {
      params: {
        userId: pinUserId,
        requestId: requestRef.id,
      },
    });
    const newSearchKey: IgetSearchKeyReturn = getSearchKeyWrapped(undefined, {
      auth: {
        uid: pinUserId,
      },
    });
    const client = algoliasearch(ALGOLIA_ID, newSearchKey.searchKey);
    const index = client.initIndex(ALGOLIA_GENERALREQUESTS_INDEX);
    const { hits } = await index.search('new request');
    expect(hits.length).toBeTruthy();
  });
});
