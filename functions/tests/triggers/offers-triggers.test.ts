import * as firebase from '@firebase/testing';
import * as Test from 'firebase-functions-test';
import * as fs from 'fs';
import { v4 as uuid } from 'uuid';

import { removeObjectFromIndices, retrieveObjectFromIndex } from '../../src/algolia';
import { triggerEventsWhenRequestIsCreated } from '../../src/posts';

const projectId = 'reach-4-help-test';

const test = Test();

const rules = fs.readFileSync(`${__dirname}/../dummy.rules`, 'utf8');

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
  displayNickname: 'newtestuser',
  username: 'newtestuser',
});

const cavUserId = uuid();

const cavUser = User.factory({
  displayPicture: null,
  displayNickname: 'newTestCavUser',
  username: 'newTestCavUser',
});

const postId = uuid();
const postId = uuid();

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
  await removeObjectFromIndices(postId);
});

describe('post creation triggers', () => {
  // create separate instances for CAV and PIN
  const { db } = authedApp({ uid: cavUserId });

  it('should not keep invalid data', async () => {
    // create record of user to make post and user to make post
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

    // create a valid post instane, we are testing posts so no need for invalid post
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

    // declare references to post and post for easier access later
    const postRef = db.collection('posts').doc(postId);
    const postRef = db.collection('posts').doc(postId);

    return (
      postRef
        .set(newRequest.toObject())
        // .then(() => new Promise(resolve => setTimeout(() => resolve(), 100)))
        .then(
          (): Promise<firebase.firestore.DocumentSnapshot> => {
            return postRef.get();
          },
        )
        .then(snap => {
          // We need to execute post triggers to put data into algolia
          return test.wrap(triggerEventsWhenRequestIsCreated)(snap, {
            params: {
              userId: pinUserId,
              postId: postRef.id,
            },
          });
        })
        .then(
          (): Promise<void> => postRef.set({ displayNickname: 'sgsdg', cavUserSnapshot: cavUser.toObject(), pinUserSnapshot: pinUser.toObject() }),
        )
        // .then(() => new Promise(resolve => setTimeout(() => resolve(), 100)))
        .then((): Promise<firebase.firestore.DocumentSnapshot> => postRef.get())
        .then(snap => {
          // execute post triggers
          return test.wrap(triggerEventsWhenOfferIsCreated)(snap, {
            params: {
              userId: cavUserId,
              postId,
            },
          });
        })
        .then(() => {
          return postRef.get();
        })
        .then(snapAfter => {
          expect(snapAfter.exists).toBeFalsy();
        })
    );
  });

  it('should keep valid data', async () => {
    // create record of user to make post and user to make post
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

    // create a valid post instane, we are testing posts so no need for invalid post
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

    // declare references to post and post for easier access later
    const postRef = db.collection('posts').doc(postId);
    const postRef = db.collection('posts').doc(postId);

    return (
      postRef
        .set(newRequest.toObject())
        // .then(() => new Promise(resolve => setTimeout(() => resolve(), 100)))
        .then(
          (): Promise<firebase.firestore.DocumentSnapshot> => {
            return postRef.get();
          },
        )
        .then(snap => {
          // We need to execute post triggers to put data into algolia
          console.log('triggering post');
          return test.wrap(triggerEventsWhenRequestIsCreated)(snap, {
            params: {
              userId: pinUserId,
              postId: postRef.id,
            },
          });
        })
        .then(
          (): Promise<void> => {
            const newOffer = Offer.factory({
              cavUserRef: db.collection('users').doc(cavUserId) as any,
              cavUserSnapshot: cavUser,
              pinUserRef: db.collection('users').doc(pinUserId) as any,
              postRef: db.collection('posts').doc(postId) as any,
              postSnapshot: newRequest,
              message: 'I want to help',
              status: OfferStatus.pending,
              createdAt: firebase.firestore.Timestamp.now(),
              updatedAt: firebase.firestore.Timestamp.now(),
            });
            return postRef.set(newOffer.toObject());
          },
        )
        // .then(() => new Promise(resolve => setTimeout(() => resolve(), 100)))
        .then(
          (): Promise<firebase.firestore.DocumentSnapshot> => {
            return postRef.get();
          },
        )
        .then(snap => {
          // execute post triggers
          console.log('executin post trigger');
          return test.wrap(triggerEventsWhenOfferIsCreated)(snap, {
            params: {
              userId: cavUserId,
              postId,
            },
          });
        })
        .then(() => {
          return postRef.get();
        })
        .then(snapAfter => {
          console.log('snapAfter.exists: ', snapAfter.exists);
          expect(snapAfter.exists).toBeTruthy();
        })
    );
  });
});

describe('post creation trigger effects on algolia authenticated index', () => {
  const { db } = authedApp({ uid: cavUserId });

  it.skip('should not assosciate with invalid post', async () => {
    // create record of user to make post and user to make post
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

    // create a valid post instane, we are testing posts so no need for invalid post
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

    // declare references to post and post for easier access later
    const postRef = db.collection('posts').doc(postId);
    const postRef = db.collection('posts').doc(postId);

    return (
      postRef
        .set(newRequest.toObject())
        // .then(() => new Promise(resolve => setTimeout(() => resolve(), 100)))
        .then(
          (): Promise<firebase.firestore.DocumentSnapshot> => {
            return postRef.get();
          },
        )
        .then(snap => {
          // We need to execute post triggers to put data into algolia
          return test.wrap(triggerEventsWhenRequestIsCreated)(snap, {
            params: {
              userId: pinUserId,
              postId: postRef.id,
            },
          });
        })
        .then(
          (): Promise<void> =>
            postRef.set({
              displayNickname: 'sgsdg',
              cavUserSnapshot: cavUser.toObject(),
              pinUserSnapshot: pinUser.toObject(),
              postRef: postRef.id,
            }),
        )
        // .then(() => new Promise(resolve => setTimeout(() => resolve(), 100)))
        .then((): Promise<firebase.firestore.DocumentSnapshot> => postRef.get())
        .then(snap => {
          // execute post triggers
          return test.wrap(triggerEventsWhenOfferIsCreated)(snap, {
            params: {
              userId: cavUserId,
              postId,
            },
          });
        })
        .then(() => {
          return retrieveObjectFromIndex(postRef.id, true);
        })
        .then((snapAfter: any) => {
          // the cav shouldn't be added to the participant list when the post is invalid
          // by default, the participatn list will have the pin so the length should be 1
          expect(snapAfter.participants.length).toBe(1);
        })
    );
  });

  it.skip('should associate with valid post', async () => {
    // create record of user to make post and user to make post
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

    // create a valid post instane, we are testing posts so no need for invalid post
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

    // declare references to post and post for easier access later
    const postRef = db.collection('posts').doc(postId);
    const postRef = db.collection('posts').doc(postId);

    return (
      postRef
        .set(newRequest.toObject())
        // .then(() => new Promise(resolve => setTimeout(() => resolve(), 100)))
        .then(
          (): Promise<firebase.firestore.DocumentSnapshot> => {
            return postRef.get();
          },
        )
        .then(snap => {
          // We need to execute post triggers to put data into algolia
          return test.wrap(triggerEventsWhenRequestIsCreated)(snap, {
            params: {
              userId: pinUserId,
              postId: postRef.id,
            },
          });
        })
        .then(
          (): Promise<void> => {
            const newOffer = Offer.factory({
              cavUserRef: db.collection('users').doc(cavUserId) as any,
              cavUserSnapshot: cavUser,
              pinUserRef: db.collection('users').doc(pinUserId) as any,
              postRef: postRef as any,
              postSnapshot: newRequest,
              message: 'I want to help',
              status: OfferStatus.pending,
              createdAt: firebase.firestore.Timestamp.now(),
              updatedAt: firebase.firestore.Timestamp.now(),
            });
            return postRef.set(newOffer.toObject());
          },
        )
        // .then(() => new Promise(resolve => setTimeout(() => resolve(), 100)))
        .then(
          (): Promise<firebase.firestore.DocumentSnapshot> => {
            return postRef.get();
          },
        )
        .then(snap => {
          // execute post triggers
          return test.wrap(triggerEventsWhenOfferIsCreated)(snap, {
            params: {
              userId: cavUserId,
              postId,
            },
          });
        })
        .then(() => {
          return retrieveObjectFromIndex(postRef.id, true);
        })
        .then((snapAfter: any) => {
          // the participant list should include both the pin and the cav
          expect(snapAfter.participants.length).toBe(2);
        })
    );
  });
});
