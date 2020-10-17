import * as functions from 'firebase-functions';
import algolia from 'algoliasearch';

import { Request } from '../models/requests';
import { UnauthenticatedRequest } from '../models/UnauthenticatedRequests';
import { GeneralRequest } from '../models/GeneralRequests';
import { Offer, OfferStatus } from '../models/offers';

const ALGOLIA_ID = functions.config().algolia.id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.key;
const ALGOLIA_UNAUTHENTICATEDREQUESTS_INDEX = functions.config().algolia.unauthenticated_requests_index;
const ALGOLIA_GENERALREQUESTS_INDEX = functions.config().algolia.general_requests_index;

const adminClient = algolia(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

const unauthenticatedRequestsIndex = adminClient.initIndex(ALGOLIA_UNAUTHENTICATEDREQUESTS_INDEX);
const generalRequestsIndex = adminClient.initIndex(ALGOLIA_GENERALREQUESTS_INDEX);

/**
 * When a request in the DB is updated,
 * add/update the details of the request in the index after hiding personal details
 * This Index is for people who aren't authenitcated to be able to see stripped down versions of it
 *
 * @param request: The instance of Request class for the request which is being updated
 * @param path: The path of the request in firestore db
 */
export const indexUnauthenticatedRequest = async (request: Request, path: string) => {
  const algoliaDoc = (await UnauthenticatedRequest.fromRequest(request, path)).toAlgolia();

  // Throw away the result since these are all void promises.
  return unauthenticatedRequestsIndex
    .saveObject(algoliaDoc)
    .wait()
    .then(() => {
      return Promise.resolve();
    });
};

/**
 * When a request in the DB is updated,
 * add/update the details of the request in the index along with searchable geodata and filterable participant list
 * This Index is for people who are authenitcated to be able to search with geodata and filter with participant list
 *
 * @param request: The instance of Request class for the request which is being updated
 * @param path: The path of the request in firestore db
 */
export const indexGeneralRequests = async (request: Request, path: string) => {
  const algoliaDoc = (await GeneralRequest.fromRequest(request, path)).toAlgolia();

  // Throw away the result since these are all void promises.
  return generalRequestsIndex
    .saveObject(algoliaDoc)
    .wait()
    .then(() => {
      return Promise.resolve();
    });
};

/**
 * When an offer is made against a request in the DB,
 * Associate the details of the offer in the request currently stored in the the index
 * This is so that a participant is reflected in the participant list to be filterable from the next query
 *
 * @param offer: The instance of Offer class for the offer which is created
 */
export const reflectOfferInRequest = async (offer: Offer) => {
  const algoliaObjectId = GeneralRequest.getObjectId(offer.requestRef.path);

  const algoliaUpdateDoc = {
    [offer.status === OfferStatus.pending ? 'participants' : 'rejected']: {
      _operation: 'AddUnique',
      value: GeneralRequest.getParticipantId(offer.cavUserRef.path),
    },
    [offer.status === OfferStatus.pending ? 'offerCount' : 'rejectionCount']: {
      _operation: 'Increment',
      value: 1,
    },
    [offer.status === OfferStatus.pending ? 'lastOfferMade' : 'lastRejectionMade']: offer.createdAt.toDate(),
    objectID: algoliaObjectId,
  };

  if (offer.requestSnapshot && (offer.requestSnapshot.offerCount > 0 || offer.requestSnapshot.rejectionCount > 0)) {
    algoliaUpdateDoc[offer.status === OfferStatus.pending ? 'firstOfferMade' : 'firstRejectionMade'] = offer.createdAt.toDate();
  }

  return generalRequestsIndex
    .partialUpdateObject(algoliaUpdateDoc, {
      createIfNotExists: false,
    })
    .wait()
    .then(() => Promise.resolve());
};

/**
 * To retrieve a single object based on the provided objectID from algolia index
 * The Algolia Index is decided based on whether the request is to be authenticated or not
 *
 * @param objectId: The objectId of the object to retrieve from the index
 * @param authenitcated: Defaults to false, is the request from authenticated user or not
 */
export const retrieveObjectFromIndex = async (objectId: string, authenticated = false) => {
  const index = authenticated ? generalRequestsIndex : unauthenticatedRequestsIndex;
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
    generalRequestsIndex
      .deleteObject(objectId)
      .wait()
      .then(() => {
        return Promise.resolve();
      }),
    unauthenticatedRequestsIndex
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
 * Information without personal details are stored in the unauthenticated requests index.
 * This function generates a search key restricted to the unauthenticated requests index
 *
 * @returns {string} The secured key restricted to the unauthenticated requests index
 */
export const generateUnauthenticatedRequestsKey = () => {
  return adminClient.generateSecuredApiKey(
    'YourSearchOnlyAPIKey', // A search key that you keep private
    {
      restrictIndices: ALGOLIA_UNAUTHENTICATEDREQUESTS_INDEX,
    },
  );
};

/**
 * Users who are visiting the app after logging in should be able to see posts on the map
 * More detailed information including participant list is stored in the general requests index.
 * This function generates a search key restricted to the general requests index
 *
 * @returns {string} The secured key restricted to the general requests index
 */
export const generateGeneralRequestsKey = () => {
  return adminClient.generateSecuredApiKey(
    'YourSearchOnlyAPIKey', // A search key that you keep private
    {
      restrictIndices: ALGOLIA_GENERALREQUESTS_INDEX,
    },
  );
};
