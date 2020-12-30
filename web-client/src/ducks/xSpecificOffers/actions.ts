import { XGeneralRequest } from 'src/models/xGeneralOffers';

import { ProfileState } from '../profile/types';
import { createXSpecificOfferFromRequest } from './functions';
import { CREATE_XSPECIFIC_OFFER } from './types';

export const sendCreateXSpecificOfferFromRequest = (
  payload: XGeneralRequest,
  profileState: ProfileState,
) => (dispatch: Function) => {
  const w = dispatch({
    type: CREATE_XSPECIFIC_OFFER,
    payload: { generalRequest: payload, creatorProfileState: profileState },
    firebase: createXSpecificOfferFromRequest,
  });
  return w;
};
