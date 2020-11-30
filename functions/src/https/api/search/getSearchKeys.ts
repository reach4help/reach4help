import * as functions from 'firebase-functions';

import {
  ALGOLIA_GENERALREQUESTS_INDEX,
  ALGOLIA_UNAUTHENTICATEDREQUESTS_INDEX,
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
      indexName: isAuthenticated ? ALGOLIA_GENERALREQUESTS_INDEX : ALGOLIA_UNAUTHENTICATEDREQUESTS_INDEX,
    };
  },
);
