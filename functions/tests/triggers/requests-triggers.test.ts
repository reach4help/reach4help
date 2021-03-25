import * as firebase from '@firebase/testing';
import * as Test from 'firebase-functions-test';
import * as fs from 'fs';
import { v4 as uuid } from 'uuid';

import { triggerEventsWhenPostIsCreated } from '../../src/posts';
import { removeObjectFromIndices, retrieveObjectFromIndex } from '../../src/algolia';
import { User } from '../../src/models/users/User';

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

describe('post creation triggers', () => {
  const { db } = authedApp({ uid: pinUserId });

  it('should delete invalid data', async () => {
    // create record of user who makes post
    await db
      .collection('users')
      .doc(pinUserId)
      .set(pinUser.toObject());

    // declare a postRef to which writes should be made to simplify access later
    const postRef = db.collection('posts').doc(postId);

    return postRef
      .set({ displayNickname: 'fsdfs', pinUserSnapshot: pinUser.toObject() })
      .then(
        (): Promise<firebase.firestore.DocumentSnapshot> => {
          return postRef.get();
        },
      )
      .then(snap => {
        // Execute the trigger on the post object on firestore
        return test.wrap(triggerEventsWhenPostIsCreated)(snap, {
          params: {
            userId: pinUserId,
            postId: postRef.id,
          },
        });
      })
      .then(() => {
        return postRef.get();
      })
      .then(snapAfter => {
        expect(snapAfter.exists).toBeFalsy();
      });
  });

  // ** TODO (es): redo this test
  it('should keep valid data', async () => {
    // create record of user who makes post
    await db
      .collection('users')
      .doc(pinUserId)
      .set(pinUser.toObject());

    // create a properly filled and acceptable post object
    // const newRequest = Request.factory({
    //   pinUserRef: db.collection('users').doc(pinUserId) as any,
    //   pinUserSnapshot: pinUser,
    //   title: 'new reqeust',
    //   description: 'new post description',
    //   latLng: new firebase.firestore.GeoPoint(0, 0),
    //   streetAddress: 'new post street address',
    //   responseCount: 0,
    //   rejectionCount: 0,
    //   firstResponseMade: null,
    //   firstRejectionMade: null,
    //   lastResponseMade: null,
    //   lastRejectionMade: null,
    //   status: RequestStatus.pending,
    //   createdAt: firebase.firestore.Timestamp.now(),
    //   updatedAt: firebase.firestore.Timestamp.now(),
  });

  //   // declare a postRef to which writes should be made to simplify access later
  //   const postRef = db.collection('posts').doc(postId);

  //   return postRef
  //     .set(newRequest.toObject())
  //     .then(
  //       (): Promise<firebase.firestore.DocumentSnapshot> => {
  //         return postRef.get();
  //       },
  //     )
  //     .then(snap => {
  //       // Execute the trigger on the post object on firestore
  //       console.log('executing post triggers');
  //       return test.wrap(triggerEventsWhenPostIsCreated)(snap, {
  //         params: {
  //           userId: pinUserId,
  //           postId: postRef.id,
  //         },
  //       });
  //     })
  //     .then(() => {
  //       return postRef.get();
  //     })
  //     .then(snapAfter => {
  //       console.log('snapAfter.exists: ', snapAfter.exists);
  //       expect(snapAfter.exists).toBeTruthy();
  //     });
  // });
});

describe.skip('post creation effects on algolia unauthenticated post', () => {
  const { db } = authedApp({ uid: pinUserId });

  it('should not add invalid data', async () => {
    // create record of user who makes post
    await db
      .collection('users')
      .doc(pinUserId)
      .set(pinUser.toObject());

    // declare a postRef to which writes should be made to simplify access later
    const postRef = db.collection('posts').doc(postId);

    return (
      postRef
        .set({ displayNickname: 'fsdfs', pinUserSnapshot: pinUser.toObject() })
        .then(
          (): Promise<firebase.firestore.DocumentSnapshot> => {
            return postRef.get();
          },
        )
        .then(snap => {
          // Execute the trigger on the post object on firestore
          return test.wrap(triggerEventsWhenPostIsCreated)(snap, {
            params: {
              userId: pinUserId,
              postId: postRef.id,
            },
          });
        })
        .then(() => {
          // Try to read the post from algolia
          return retrieveObjectFromIndex(postRef.id, false);
        })
        // Trigger shouldn't add incorrect data into algolia so the above post must fail
        .then(() => expect(false).toBeTruthy())
        .catch(error => expect(error.status).toBe(404))
    );
  });

  it('should add valid data', async () => {
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

    return (
      postRef
        .set(newRequest.toObject())
        .then(
          (): Promise<firebase.firestore.DocumentSnapshot> => {
            return postRef.get();
          },
        )
        .then(snap => {
          // Execute the trigger on the post object on firestore
          return test.wrap(triggerEventsWhenPostIsCreated)(snap, {
            params: {
              userId: pinUserId,
              postId: postRef.id,
            },
          });
        })
        .then(() => {
          return retrieveObjectFromIndex(postRef.id, false);
        })
        // since data is correct, the post should be present in algolia indexed with postId as the objectId
        .then((snapAfter: any) => {
          expect(snapAfter.objectID).toBe(postId);
        })
    );
  });
});

describe.skip('post creation effects on algolia authenticated post', () => {
  const { db } = authedApp({ uid: pinUserId });

  it('should not add invalid data', async () => {
    // create record of user who makes post
    await db
      .collection('users')
      .doc(pinUserId)
      .set(pinUser.toObject());

    // declare a postRef to which writes should be made to simplify access later
    const postRef = db.collection('posts').doc(postId);

    return (
      postRef
        .set({ displayNickname: 'fsdfs', pinUserSnapshot: pinUser.toObject() })
        .then(
          (): Promise<firebase.firestore.DocumentSnapshot> => {
            return postRef.get();
          },
        )
        .then(snap => {
          // Execute the trigger on the post object on firestore
          return test.wrap(triggerEventsWhenPostIsCreated)(snap, {
            params: {
              userId: pinUserId,
              postId: postRef.id,
            },
          });
        })
        .then(() => {
          // Try to read the post from algolia
          return retrieveObjectFromIndex(postRef.id, true);
        })
        // Trigger shouldn't add incorrect data into algolia so the above post must fail
        .then(() => expect(false).toBeTruthy())
        .catch(error => expect(error.status).toBe(404))
    );
  });

  it('should add valid data', async () => {
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
      responseCount: 0,
      rejectionCount: 0,
      firstResponseMade: null,
      firstRejectionMade: null,
      lastResponseMade: null,
      lastRejectionMade: null,
      status: RequestStatus.pending,
      createdAt: firebase.firestore.Timestamp.now(),
      updatedAt: firebase.firestore.Timestamp.now(),
    });

    return (
      postRef
        .set(newRequest.toObject())
        .then(
          (): Promise<firebase.firestore.DocumentSnapshot> => {
            return postRef.get();
          },
        )
        .then(snap => {
          // Execute the trigger on the post object on firestore
          return test.wrap(triggerEventsWhenPostIsCreated)(snap, {
            params: {
              userId: pinUserId,
              postId: postRef.id,
            },
          });
        })
        .then(() => {
          return retrieveObjectFromIndex(postRef.id, true);
        })
        // since data is correct, the post should be present in algolia indexed with postId as the objectId
        .then(snapAfter => {
          expect(snapAfter.objectID).toBe(postId);
        })
    );
  });
});
