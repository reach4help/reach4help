import { IgetSearchKey, IgetSearchKeyResult } from 'src/ducks/search/types';
import { functions } from 'src/firebase';

export const getSearchKey = async ({
  authenticated,
}: IgetSearchKey): Promise<IgetSearchKeyResult> =>
  functions
    .httpsCallable('https-api-requests-getSearchKey')({
      authenticated,
    })
    .then(({ data }) => data);
