import { IgetSearchKey, IgetSearchKeyResult } from 'src/ducks/search/types';
import { firebaseFunctions } from 'src/firebaseConfig';

export const getSearchKey = async ({
  authenticated,
}: IgetSearchKey): Promise<IgetSearchKeyResult> =>
  firebaseFunctions
    .httpsCallable('https-api-getSearchKey')({
      authenticated,
    })
    .then(({ data }) => data);
