import * as functions from 'firebase-functions';
import algolia, { SearchClient } from 'algoliasearch';
import { firestore } from 'firebase-admin';
import { IRequest, Request } from '../models/requests';
import DocumentSnapshot = firestore.DocumentSnapshot;

let algoliaId: string;
let algoliaAdminKey: string;
let algoliaRequestsIndex: string;
let adminClient: SearchClient;
try {
  algoliaId = functions.config().algolia.id;
  algoliaAdminKey = functions.config().algolia.admin_key;
  algoliaRequestsIndex = functions.config().algolia.requests_index;
  adminClient = algolia(algoliaId, algoliaAdminKey);
  if (algoliaId && algoliaAdminKey && algoliaRequestsIndex) {
    throw new Error('One or more algolia parameters not configured');
  }
} catch (err) {
  console.error('WARNING Algolia configuration error');
  console.error(err);
}

/**
 * When records in the DB are updated, add/update the text index
 *
 * @param snap: the DocumentSnapshot being modified
 */
export const indexRequest = (snap: DocumentSnapshot) => {
  const data = snap.data();

  if (data) {
    const request = Request.factory(data as IRequest);
    const index = adminClient.initIndex(algoliaRequestsIndex);

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
};

/**
 * When records in the DB are deleted, delete them in the text index
 *
 * @param snap: the DocumentSnapshot being deleted
 */
export const removeRequestFromIndex = (snap: DocumentSnapshot) => {
  const objectID = snap.id;
  const index = adminClient.initIndex(algoliaRequestsIndex);
  return index.deleteObject(objectID);
};
