import Location from 'react-app-location';

/*
 * :type is either 'request' or 'offer'
 */
export const postUrlRoot = '/post';

export enum PostsSuffixTypes {
  requests = 'requests',
  offers = 'offers',
}
const offerPostsSuffix = PostsSuffixTypes.offers.valueOf();
const requestPostsSuffix = PostsSuffixTypes.requests.valueOf();

export const AcceptedRequestsLocation = new Location(`${postUrlRoot}/accepted`);
export const FindRequestsLocation = new Location(`${postUrlRoot}/find`);
export const OpenRequestsLocation = new Location(`${postUrlRoot}/open`);
export const OfferPostsLocation = new Location(
  `${postUrlRoot}/${offerPostsSuffix}`,
);
export const RequestPostsLocation = new Location(
  `${postUrlRoot}/${requestPostsSuffix}`,
);
