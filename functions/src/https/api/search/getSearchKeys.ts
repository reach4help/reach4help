import * as functions from 'firebase-functions';

import {
  ALGOLIA_GENERALPOSTS_INDEX,
  ALGOLIA_ID,
  ALGOLIA_UNAUTHENTICATEDPOSTS_INDEX,
  generateGeneralPostsKey,
  generateUnauthenticatedPostsKey,
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
      appId: ALGOLIA_ID,
      searchKey: isAuthenticated ? generateGeneralPostsKey() : generateUnauthenticatedPostsKey(),
      indexName: isAuthenticated ? ALGOLIA_GENERALPOSTS_INDEX : ALGOLIA_UNAUTHENTICATEDPOSTS_INDEX,
    };
  },
);
