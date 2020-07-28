import * as functions from 'firebase-functions';
import algolia from 'algoliasearch';
import { firestore } from 'firebase-admin';
import { IRequest, Request } from '../models/requests';
import DocumentSnapshot = firestore.DocumentSnapshot;
import { UnauthenticatedRequest } from '../models/UnauthenticatedRequests';
import { GeneralRequest } from '../models/GeneralRequests';
import { config } from '../config/config'
import { Offer, OfferStatus } from '../models/offers';

const ALGOLIA_ID = functions.config().algolia.id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.key;
const ALGOLIA_REQUESTS_INDEX = functions.config().algolia.requests_index;
const ALGOLIA_UNAUTHENTICATEDREQUESTS_INDEX = config.get('env') === 'test' ? 'unauthenticatedRequests_test' : functions.config().algolia.unauthenticated_requests_index;
const ALGOLIA_GENERALREQUESTS_INDEX = config.get('env') === 'test' ? 'generalRequests_test' : functions.config().algolia.general_requests_index;

const adminClient = algolia(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

/**
 * When records in the DB are updated, add/update the text index
 *
 * @param snap: the DocumentSnapshot being modified
 */
export const indexRequest = (snap: DocumentSnapshot) => {
  try {
    const data = snap.data();

    if (data) {
      const request = Request.factory(data as IRequest);
      const index = adminClient.initIndex(ALGOLIA_REQUESTS_INDEX);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const indexData: any = { ...request.toObject() };

      // We have to make sure we use the same ID in Algolia
      indexData.objectID = snap.id;

      // Now re-do the geo-coding for Algolia
      delete indexData.latLng;
      indexData._geoloc = {
        lat: request.latLng.latitude,
        lng: request.latLng.longitude,
      };

      // Throw away the result since these are all void promises.
      return index.saveObject(indexData).then(() => {
        return Promise.resolve();
      });
    }

    return Promise.resolve();
  } catch (error) {
    console.error('error occured while indexing data: ', error);
    // Temporarily until billing account issue is solved
    return Promise.resolve();
  }
};

/**
 * When records in the DB are deleted, delete them in the text index
 *
 * @param snap: the DocumentSnapshot being deleted
 */
export const removeRequestFromIndex = (snap: DocumentSnapshot) => {
  try {
    const objectID = snap.id;
    const index = adminClient.initIndex(ALGOLIA_REQUESTS_INDEX);
    return index.deleteObject(objectID);
  } catch (error) {
    console.error('error occured while removing index: ', error);
    // Temporarily until billing account issue is solved
    return Promise.resolve();
  }
};

export const indexUnauthenticatedRequest = async (request: Request, path: string) => {
  const algoliaDoc = (await UnauthenticatedRequest.fromRequest(request, path)).toAlgolia();
  const index = adminClient.initIndex(ALGOLIA_UNAUTHENTICATEDREQUESTS_INDEX);

  // Throw away the result since these are all void promises.
  return index.saveObject(algoliaDoc).then(() => {
    return Promise.resolve();
  });
}

export const indexGeneralRequests = async (request: Request, path: string) => {
  const algoliaDoc = (await GeneralRequest.fromRequest(request, path)).toAlgolia();
  const index = adminClient.initIndex(ALGOLIA_GENERALREQUESTS_INDEX);

  // Throw away the result since these are all void promises.
  return index.saveObject(algoliaDoc).then(() => {
    return Promise.resolve();
  });
}

export const reflectOfferInRequest = async (offer: Offer, isFirstOffer = false) => {
  const algoliaObjectId = GeneralRequest.getObjectId(offer.requestRef.path);
  const index = adminClient.initIndex(ALGOLIA_GENERALREQUESTS_INDEX);

  const algoliaUpdateDoc = {
    [offer.status === OfferStatus.pending ? 'participants' : 'rejected']: {
      _operation: 'AddUnique',
      value: GeneralRequest.getParticipantId(offer.cavUserRef.path),
    },
    [offer.status === OfferStatus.pending ? 'offersCount' : 'rejectionCount']: {
      _operation: 'Increment',
      value: 1,
    },
    [offer.status === OfferStatus.pending ? 'lastOfferMade' : 'lastRejectionMade']: offer.createdAt.toDate(),
    objectID: algoliaObjectId,
  }

  if (isFirstOffer) {
    algoliaUpdateDoc[offer.status === OfferStatus.pending ? 'firstOfferMade' : 'firstRejectionMade'] = offer.createdAt.toDate();
  }
  
  return index.partialUpdateObject(algoliaUpdateDoc, {
    createIfNotExists: false
  });
}