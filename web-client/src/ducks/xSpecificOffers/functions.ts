import { firestore } from 'src/firebase';
import { User } from 'src/models/users';
import { XGeneralRequest } from 'src/models/xGeneralRequests';
import {
  XSpecificOffer,
  XSpecificOfferFirestoreConverter,
} from 'src/models/xSpecificOffers';

import { ProfileState } from '../profile/types';

export const createXSpecificOfferFromRequest = async ({
  generalRequest,
  creatorProfileState,
}: {
  generalRequest: XGeneralRequest;
  creatorProfileState: ProfileState;
}) => {
  const creatorSnapshot = creatorProfileState.profile;
  const creatorRef = creatorProfileState.userRef;
  const generalRequestWithUser = { ...generalRequest } as XGeneralRequest;
  generalRequestWithUser.creatorId =
    creatorRef || generalRequestWithUser.creatorId;
  generalRequestWithUser.creatorSnapshot =
    creatorSnapshot || generalRequestWithUser.creatorSnapshot;
  const xspecificOffer: XSpecificOffer = XSpecificOffer.factory(
    generalRequestWithUser,
  );

  xspecificOffer.sourcePublicPostId = null; // TODO: (es) Needs to be reference of general request, need to add that to the model
  xspecificOffer.requestingHelp = false;
  if (creatorProfileState?.userRef && creatorProfileState.profile) {
    xspecificOffer.creatorId = creatorProfileState.userRef;
    xspecificOffer.creatorSnapshot = User.factory(creatorProfileState.profile);
  }

  xspecificOffer.isResponse = true;
  // TODO: (es) Have to fix this, should not have to use _geoLoc - latLng should be defined
  // When fix this, also fix Post model to get rid of geoloc
  // eslint-disable-next-line no-underscore-dangle
  if (!xspecificOffer.latLng && generalRequest?._geoloc) {
    // eslint-disable-next-line no-underscore-dangle
    xspecificOffer.latLng = generalRequest._geoloc;
  }

  const w = await firestore
    .collection('posts')
    .doc()
    .withConverter(XSpecificOfferFirestoreConverter)
    .set(xspecificOffer);
  return w;
};
