import { firestore } from 'src/firebase';
// eslint-disable-next-line no-unused-vars
import { RequestRefType } from 'src/models/requests';
// eslint-disable-next-line no-unused-vars
import { TimelineItemFirestoreConverter } from 'src/models/requests/timeline';

// const getRequest = async (requestRef: RequestRefType) => {
//   return requestRef
//     .withConverter(RequestFirestoreConverter)
//     .get()
//     .then(snapshot => ({
//         id: snapshot.id,
//         _requestRef: snapshot.ref,
//         // TODO:(es) Convert to request here?
//         ...snapshot.data(),
//     }));
// };

// const getOffersForRequest = async (requestRef: RequestRefType) => {
//   const result = await requestRef.collection('offers').get();
//   const offers: Record<string, IOffer> = {};

//   for (const doc of result.docs) {
//     const offer = Offer.factory(doc.data() as IOffer);
//     // TODO: (es) const cavPrivilegedInfo =
//     //   offer.cavUserSnapshot.username === 'deleteduser'
//     //     ? null
//     //     : PrivilegedUserInformation.factory(
//     //         /* eslint-disable no-await-in-loop */
//     //         (
//     //           await offer.cavUserRef
//     //             .collection('privilegedInformation')
//     //             .doc(offer.cavUserRef.id)
//     //             .get()
//     //         ).data() as IPrivilegedUserInformation,
//     //       );

//     offers[doc.id] = {
//       ...offer.toObject(),
//       // address: cavPrivilegedInfo && cavPrivilegedInfo.addresses ? cavPrivilegedInfo.addresses.default : deletedAddress,
//     } as IOffer;
//   }
//   return offers;
// };

// const getTimelineItemsForRequest = async (
//   requestRef: RequestRefType,
// ): Promise<ITimelineItem[]> => {
//   const timelinesResult = await requestRef
//     .collection('timeline')
//     // TODO: (es)
//     .where('action', 'in', [
//       TimelineItemAction.ACCEPT_OFFER,
//       TimelineItemAction.CREATE_REQUEST,
//       TimelineItemAction.CREATE_OFFER,
//       TimelineItemAction.CAV_DECLINED,
//       TimelineItemAction.REJECT_OFFER,
//       TimelineItemAction.REMOVE_REQUEST,
//     ])
//     .withConverter(TimelineItemFirestoreConverter)
//     .get();
//   const timeline: ITimelineItem[] = [];
//   for (const doc of timelinesResult.docs) {
//     timeline.push(doc.data() as ITimelineItem);
//   }
//   return timeline;
// };

export const getPostWithOffersAndTimelineItems = (requestRef: RequestRefType) =>
  requestRef;
// const request = await getRequest(requestRef);
// const timeline = await getTimelineItemsForRequest(requestRef);
// const offers = await getOffersForRequest(requestRef);

// const requestWithOffers = RequestWithOffersAndTimeline.factory({
//   ...(request.toObject() as IRequest),
//   offers: offers,
//   timeline: timeline,
// } as IRequestWithOffersAndTimelineItems);

// return requestWithOffers;

export const getTimelinesForPost = (
  // nextValue: Function,
  payload: { postId: string }, // TODO: (es) firebase.Unsubscribe =>
) =>
  firestore
    .collection('requests')
    .doc(payload.postId)
    .collection('timeline')
    .withConverter(TimelineItemFirestoreConverter);
// TODO (es): .onSnapshot(snap => nextValue(snap));
