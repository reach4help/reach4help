import * as functions from 'firebase-functions';

import { generateGeneralRequestsKey, generateUnauthenticatedRequestsKey } from '../../../algolia';

export const getSearchKey = functions.https.onCall((data, context) => {
  const userId = context.auth?.uid;
  if (userId) {
    return {
      searchKey: generateGeneralRequestsKey(),
    };
  }
  return {
    searchKey: generateUnauthenticatedRequestsKey(),
  };
});
