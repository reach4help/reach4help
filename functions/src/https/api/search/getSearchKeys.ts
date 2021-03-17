import * as functions from 'firebase-functions';

import {
  ALGOLIA_GENERALREQUESTS_INDEX,
  ALGOLIA_ID,
  ALGOLIA_UNAUTHENTICATEDREQUESTS_INDEX,
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
      indexName: isAuthenticated ? ALGOLIA_GENERALREQUESTS_INDEX : ALGOLIA_UNAUTHENTICATEDREQUESTS_INDEX,
    };
  },
);
