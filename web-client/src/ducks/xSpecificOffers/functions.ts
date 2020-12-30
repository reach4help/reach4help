import { firestore } from 'src/firebase';
import { XGeneralRequest } from 'src/models/xGeneralOffers';
import { XSpecificOffer, XSpecificOfferFirestoreConverter } from 'src/models/xSpecificOffers';

export const createXSpecificOfferFromRequest = async ({
  generalRequest,
}: {
  generalRequest: XGeneralRequest;
}) => {
  const xspecificOffer: XSpecificOffer = JSON.parse(JSON.stringify(generalRequest));
  xspecificOffer.parentRef = null; // TODO: (es) Needs to be reference of general request, need to add that to the model
  xspecificOffer.requestingHelp = false;
  xspecificOffer.isResponse = true;
 console.log('here');
 const w = await
  firestore
    .collection('posts')
    .doc()
    .withConverter(XSpecificOfferFirestoreConverter)
    .set(xspecificOffer);
  console.log('wait 2', w);
  return w;
};
