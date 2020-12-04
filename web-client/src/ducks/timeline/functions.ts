import { firestore } from 'src/firebase';
// eslint-disable-next-line no-unused-vars
import { IOffer, Offer } from 'src/models/offers';
import { IRequest, Request, RequestFirestoreConverter, RequestRefType } from 'src/models/requests';
import { IRequestWithOffersAndTimelineItems, RequestWithOffersAndTimeline } from 'src/models/requests/RequestWithOffersAndTimeline';
// eslint-disable-next-line no-unused-vars
import { ITimelineItem, TimelineItemAction, TimelineItemFirestoreConverter } from 'src/models/requests/timeline';

const getRequest = async (requestRef: RequestRefType): Promise<IRequest> => {
  console.log('abcd');
  let requestData;
    await firestore
      .collection('requests')
      .doc('1EQlpGu0QQMBji6MEPZ7')
      .withConverter(RequestFirestoreConverter)
      .get()
      .then(snapshot => {
          console.log('xxx',snapshot);
          requestData = {
          id: snapshot.id,
          _requestRef: snapshot.ref,
          // TODO:(es) Convert to request here?
          ...snapshot.data(),
        };
      });

  console.log('xxxx', requestData, 'xxxz', requestRef);
  const request = Request.factoryFromUnderscore({ ...requestData, requestRef });
  console.log('xxxz2', request);
  return request as IRequest;
};

const getOffersForRequest = async (requestRef: RequestRefType) => {
  console.log('zz6', requestRef);
  const result = await requestRef
    .collection('offers')
    .get();
  console.log('zz6.1');
  const offers: Record<string, IOffer> = {};

  for (const doc of result.docs) {
    const offer = Offer.factory(doc.data() as IOffer);
    // TODO: (es) const cavPrivilegedInfo =
    //   offer.cavUserSnapshot.username === 'deleteduser'
    //     ? null
    //     : PrivilegedUserInformation.factory(
    //         /* eslint-disable no-await-in-loop */
    //         (
    //           await offer.cavUserRef
    //             .collection('privilegedInformation')
    //             .doc(offer.cavUserRef.id)
    //             .get()
    //         ).data() as IPrivilegedUserInformation,
    //       );

    offers[doc.id] = {
      ...offer.toObject(),
      // address: cavPrivilegedInfo && cavPrivilegedInfo.addresses ? cavPrivilegedInfo.addresses.default : deletedAddress,
    } as IOffer;
  }
  console.log('zz6 offers', offers);
  return offers;
};

const getTimelineItemsForRequest = async (
  requestRef: RequestRefType,
): Promise<ITimelineItem[]> => {
  console.log('zz5.0');
  const timelinesResult = await requestRef
    .collection('timeline')
    // TODO: (es)
    .where('action', 'in', [
      TimelineItemAction.ACCEPT_OFFER,
      TimelineItemAction.CREATE_REQUEST,
      TimelineItemAction.CREATE_OFFER,
      TimelineItemAction.CAV_DECLINED,
      TimelineItemAction.REJECT_OFFER,
      TimelineItemAction.REMOVE_REQUEST,
    ])
    .withConverter(TimelineItemFirestoreConverter)
    .get();
  const timeline: ITimelineItem[] = [];
  for (const doc of timelinesResult.docs) {
    timeline.push(doc.data() as ITimelineItem);
  }
  console.log('zz5', timeline);
  return timeline;
};

export const getPostWithOffersAndTimelineItems = async (requestRef: RequestRefType) => {
  const request = await getRequest(requestRef);
  const timeline = await getTimelineItemsForRequest(requestRef);
  const offers = await getOffersForRequest(requestRef);

  console.log('fff factory', request, 'asdf', request.toObject());
  const requestWithOffers = RequestWithOffersAndTimeline.factory({
    ...(request.toObject() as IRequest),
    offers: offers,
    timeline: timeline,
  } as IRequestWithOffersAndTimelineItems);

  return requestWithOffers;
};

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
