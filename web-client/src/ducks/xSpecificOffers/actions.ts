import { XGeneralRequest } from 'src/models/xGeneralRequests';

import { ProfileState } from '../profile/types';
import { createXSpecificOfferFromRequest } from './functions';
import { OBSERVE_CREATE_XSPECIFIC_OFFER } from './types';

export const observeCreateXSpecificOfferFromRequest = (
  payload: XGeneralRequest,
  profileState: ProfileState,
) => (dispatch: Function) =>
  dispatch({
    type: OBSERVE_CREATE_XSPECIFIC_OFFER,
    payload: { generalRequest: payload, creatorProfileState: profileState },
    firebase: createXSpecificOfferFromRequest,
  });
