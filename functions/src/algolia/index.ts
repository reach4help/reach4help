import * as functions from 'firebase-functions';
import algolia from 'algoliasearch';

import { Post } from '../models/posts/Post';
import { GenericPostStatus } from '../models/posts/GenericPostStatus';
import { UnauthenticatedPost } from '../models/UnauthenticatedPost';
import { GeneralPost } from '../models/posts/GeneralPost';

const ALGOLIA_ID = functions.config().algolia.id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.key;
const ALGOLIA_SEARCH_ONLY_KEY = functions.config().algolia.search_only_key;
export const ALGOLIA_UNAUTHENTICATEDPOSTS_INDEX = functions.config().algolia.unauthenticated_posts_index;
export const ALGOLIA_GENERALPOSTS_INDEX = functions.config().algolia.general_posts_index;

const adminClient = algolia(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

const unauthenticatedPostsIndex = adminClient.initIndex(ALGOLIA_UNAUTHENTICATEDPOSTS_INDEX);
const generalPostsIndex = adminClient.initIndex(ALGOLIA_GENERALPOSTS_INDEX);

/**
 * When a post in the DB is updated,
 * add/update the details of the post in the index after hiding personal details
 * This Index is for people who aren't authenitcated to be able to see stripped down versions of it
 *
 * @param request: The instance of Request class for the post which is being updated
 * @param path: The path of the post in firestore db
 */
export const indexUnauthenticatedPost = async (post: Post, path: string) => {
  const algoliaDoc = (await UnauthenticatedPost.fromPost(post, path)).toAlgolia();

  // Throw away the result since these are all void promises.
  return unauthenticatedPostsIndex
    .saveObject(algoliaDoc)
    .wait()
    .then(() => {
      return Promise.resolve();
    });
};

/**
 * When a post in the DB is updated,
 * add/update the details of the post in the index along with searchable geodata and filterable participant list
 * This Index is for people who are authenitcated to be able to search with geodata and filter with participant list
 *
 * @param post: The instance of Post class for the post which is being updated
 * @param path: The path of the post in firestore db
 */
export const indexGeneralPost = async (post: Post, path: string) => {
  const algoliaDoc = (await GeneralPost.fromPost(post, path)).toAlgolia();

  // Throw away the result since these are all void promises.
  return generalPostsIndex
    .saveObject(algoliaDoc)
    .wait()
    .then(() => {
      return Promise.resolve();
    });
};

/**
 * When a response is made against a post in the DB,
 * Associate the details of the response in the post currently stored in the the index
 * This is so that a participant is reflected in the participant list to be filterable from the next query
 *
 * @param response: The instance of Post class with isResponse as true
 */
export const reflectResponseInPost = async (response: Post) => {
  const algoliaObjectId = GeneralPost.getObjectId(response.parentRef!.path);

  const algoliaUpdateDoc: Record<string, any> = {
    [response.status === GenericPostStatus.pending ? 'participants' : 'rejected']: {
      _operation: 'AddUnique',
      value: GeneralPost.getObjectId(response.creatorRef),
    },
    objectID: algoliaObjectId,
  };

  return generalPostsIndex
    .partialUpdateObject(algoliaUpdateDoc, {
      createIfNotExists: false,
    })
    .wait()
    .then(() => Promise.resolve());
};

/**
 * To retrieve a single object based on the provided objectID from algolia index
 * The Algolia Index is decided based on whether the post is to be authenticated or not
 *
 * @param objectId: The objectId of the object to retrieve from the index
 * @param authenitcated: Defaults to false, is the post from authenticated user or not
 */
export const retrieveObjectFromIndex = async (objectId: string, authenticated = false) => {
  const index = authenticated ? generalPostsIndex : unauthenticatedPostsIndex;
  return index.getObject(objectId);
};

/**
 * To remove a single object based on the provided objectID from algolia indices
 * The object will be removed from both the indices for authenticated and unauthenticated requests
 *
 * @param objectId: The objectId of the object to delete from the indices
 */
export const removeObjectFromIndices = async (objectId: string) => {
  return Promise.all([
    generalPostsIndex
      .deleteObject(objectId)
      .wait()
      .then(() => {
        return Promise.resolve();
      }),
    unauthenticatedPostsIndex
      .deleteObject(objectId)
      .wait()
      .then(() => {
        return Promise.resolve();
      }),
  ]);
};

/**
 * Users who are visiting the app without logging in should be able to see posts on the map
 * But they shouldn't be able to see the personal details of the posts.
 * Information without personal details are stored in the unauthenticated posts index.
 * This function generates a search key restricted to the unauthenticated posts index
 *
 * @returns {string} The secured key restricted to the unauthenticated posts index
 */
export const generateUnauthenticatedPostsKey = (): string => {
  return adminClient.generateSecuredApiKey(
    ALGOLIA_SEARCH_ONLY_KEY, // A search key that you keep private
    {
      restrictIndices: ALGOLIA_UNAUTHENTICATEDPOSTS_INDEX,
    },
  );
};

/**
 * Users who are visiting the app after logging in should be able to see posts on the map
 * More detailed information including participant list is stored in the general posts index.
 * This function generates a search key restricted to the general posts index
 *
 * @returns {string} The secured key restricted to the general posts index
 */
export const generateGeneralPostsKey = (): string => {
  return adminClient.generateSecuredApiKey(
    ALGOLIA_SEARCH_ONLY_KEY, // A search key that you keep private
    {
      restrictIndices: ALGOLIA_GENERALPOSTS_INDEX,
    },
  );
};
