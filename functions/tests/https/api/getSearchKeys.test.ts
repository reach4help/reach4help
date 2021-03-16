import * as firebase from '@firebase/testing';
import algoliasearch from 'algoliasearch';
import * as Test from 'firebase-functions-test';
import * as functions from 'firebase-functions';
import * as fs from 'fs';
import { v4 as uuid } from 'uuid';

import { triggerEventsWhenPostIsCreated } from '../../../src/posts';
import { removeObjectFromIndices } from '../../../src/algolia';
import { getSearchKey, IgetSearchKeyReturn } from '../../../src/https/api/search/getSearchKeys';

const projectId = 'reach-4-help-test';

const test = Test();
const ALGOLIA_ID = functions.config().algolia.id;
const ALGOLIA_UNAUTHENTICATEDREQUESTS_INDEX = functions.config().algolia.unauthenticated_posts_index;
const ALGOLIA_GENERALREQUESTS_INDEX = functions.config().algolia.general_posts_index;

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
  username: 'newtestuser',
});

const postId = uuid();

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
  await removeObjectFromIndices(postId);
});

// TODO: Rewrite tests using posts

describe.skip('Unauthenticated users to find posts', () => {
  const { db } = authedApp({ uid: pinUserId });

  it('should allow searching unauthenticated posts index using restricted key', async () => {
    // create record of user who makes post
    await db
      .collection('users')
      .doc(pinUserId)
      .set(pinUser.toObject());

    // declare a postRef to which writes should be made to simplify access later
    const postRef = db.collection('posts').doc(postId);

    // create a properly filled and acceptable post object
    const newRequest = Request.factory({
      pinUserRef: db.collection('users').doc(pinUserId) as any,
      pinUserSnapshot: pinUser,
      title: 'new reqeust',
      description: 'new post description',
      latLng: new firebase.firestore.GeoPoint(0, 0),
      streetAddress: 'new post street address',
      status: RequestStatus.pending,
      createdAt: firebase.firestore.Timestamp.now(),
      updatedAt: firebase.firestore.Timestamp.now(),
    });

    await postRef.set(newRequest.toObject());
    const snap = await postRef.get();
    // Execute the trigger on the post object on firestore
    await test.wrap(triggerEventsWhenPostIsCreated)(snap, {
      params: {
        userId: pinUserId,
        postId: postRef.id,
      },
    });
    const newSearchKey: IgetSearchKeyReturn = getSearchKeyWrapped(undefined);
    console.log('search key being used for unauthenticated posts: ', newSearchKey.searchKey);
    console.log('index being used for unauthenticated posts: ', ALGOLIA_UNAUTHENTICATEDREQUESTS_INDEX);
    const client = algoliasearch(ALGOLIA_ID, newSearchKey.searchKey);
    const index = client.initIndex(ALGOLIA_UNAUTHENTICATEDREQUESTS_INDEX);
    const { hits } = await index.search('new post');
    expect(hits.length).toBeTruthy();
  });
});

describe.skip('Authenticated users to find posts', () => {
  const { db } = authedApp({ uid: pinUserId });

  it('should allow searching general posts index using restricted key', async () => {
    // create record of user who creates post
    await db
      .collection('users')
      .doc(pinUserId)
      .set(pinUser.toObject());

    // declare a postRef to which writes should be made to simplify access later
    const postRef = db.collection('posts').doc(postId);

    // create a properly filled and acceptable post object
    const newRequest = Request.factory({
      pinUserRef: db.collection('users').doc(pinUserId) as any,
      pinUserSnapshot: pinUser,
      title: 'new reqeust',
      description: 'new post description',
      latLng: new firebase.firestore.GeoPoint(0, 0),
      streetAddress: 'new post street address',
      status: RequestStatus.pending,
      createdAt: firebase.firestore.Timestamp.now(),
      updatedAt: firebase.firestore.Timestamp.now(),
    });

    await postRef.set(newRequest.toObject());
    const snap = await postRef.get();
    // Execute the trigger on the post object on firestore
    await test.wrap(triggerEventsWhenRequestIsCreated)(snap, {
      params: {
        userId: pinUserId,
        postId: postRef.id,
      },
    });
    const newSearchKey: IgetSearchKeyReturn = getSearchKeyWrapped(undefined, {
      auth: {
        uid: pinUserId,
      },
    });
    console.log('search key being used for authenticated posts: ', newSearchKey.searchKey);
    console.log('index being used for authenticated posts: ', ALGOLIA_GENERALREQUESTS_INDEX);
    const client = algoliasearch(ALGOLIA_ID, newSearchKey.searchKey);
    const index = client.initIndex(ALGOLIA_GENERALREQUESTS_INDEX);
    const { hits } = await index.search('new post');
    expect(hits.length).toBeTruthy();
  });
});
