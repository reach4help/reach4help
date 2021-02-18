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
  searchKey: string;
  indexName: string;
}

export const getSearchKey = functions.https.onCall(
  (data, context): IgetSearchKeyReturn => {
    const isAuthenticated = !!context.auth?.uid;
    return {
      isAuthenticated,
      searchKey: isAuthenticated ? generateGeneralRequestsKey() : generateUnauthenticatedRequestsKey(),
      indexName: isAuthenticated ? ALGOLIA_GENERALPOSTS_INDEX : ALGOLIA_UNAUTHENTICATEDPOSTS_INDEX,
    };
  },
);
