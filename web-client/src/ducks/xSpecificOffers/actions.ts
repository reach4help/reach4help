import { XGeneralRequest } from 'src/models/xGeneralOffers';

import {
  createXSpecificOfferFromRequest,
} from './functions';
import {
  CREATE_XSPECIFIC_OFFER,
} from './types';

export const sendCreateXSpecificOfferFromRequest = (payload: XGeneralRequest) => (
  dispatch: Function,
) => {
  console.log('send debug');
  const w =
  dispatch({
    type: CREATE_XSPECIFIC_OFFER,
    payload,
    firebase: createXSpecificOfferFromRequest,
  });
  console.log('wait xxxx', w);
  return w;
};
