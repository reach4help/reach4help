import * as functions from 'firebase-functions';
import algolia from 'algoliasearch';
import { firestore } from 'firebase-admin';
import { IRequest, Request } from '../models/requests';
import DocumentSnapshot = firestore.DocumentSnapshot;

const ALGOLIA_ID = functions.config().algolia.id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.key;
const ALGOLIA_REQUESTS_INDEX = functions.config().algolia.requests_index;

const adminClient = algolia(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

/**
 * When records in the DB are updated, add/update the text index
 *
 * @param snap: the DocumentSnapshot being modified
 */
export const indexRequest = (snap: DocumentSnapshot) => {
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
    return index.saveObject(indexData)
      .then(() => {
        return Promise.resolve();
      });
  }

  return Promise.resolve();
};

/**
 * When records in the DB are deleted, delete them in the text index
 *
 * @param snap: the DocumentSnapshot being deleted
 */
export const removeRequestFromIndex = (snap: DocumentSnapshot) => {
  const objectID = snap.id;
  const index = adminClient.initIndex(ALGOLIA_REQUESTS_INDEX);
  return index.deleteObject(objectID);
};
