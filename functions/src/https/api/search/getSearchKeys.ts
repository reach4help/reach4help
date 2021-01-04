import * as functions from 'firebase-functions';

import {
  ALGOLIA_GENERALPOSTS_INDEX,
  ALGOLIA_ID,
  ALGOLIA_UNAUTHENTICATEDPOSTS_INDEX,
  generateGeneralRequestsKey,
  generateUnauthenticatedRequestsKey,
} from '../../../algolia';

export interface IgetSearchKeyReturn {
  isAuthenticated: boolean;
  appId: string;
  searchKey: string;
  indexName: string;
}

export const getSearchKey = functions.https.onCall(
  (data, context): IgetSearchKeyReturn => {
    console.log('context: ', context);
    const isAuthenticated = !!context.auth?.uid;
    console.log('isAuthenticated: ', isAuthenticated);
    return {
      isAuthenticated,
      appId: ALGOLIA_ID,
      searchKey: isAuthenticated ? generateGeneralRequestsKey() : generateUnauthenticatedRequestsKey(),
      indexName: isAuthenticated ? ALGOLIA_GENERALPOSTS_INDEX : ALGOLIA_UNAUTHENTICATEDPOSTS_INDEX,
    };
  },
);
