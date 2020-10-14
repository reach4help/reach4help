import Location from 'react-app-location';
import * as Yup from 'yup';

export const postUrlRoot = '/list';

export enum PostTabsType {
  requests = 'requests',
  offers = 'offers',
}

export const AcceptedRequestsLocation = new Location(`${postUrlRoot}/accepted`);
export const FindRequestsLocation = new Location(`${postUrlRoot}/find`);
export const OpenRequestsLocation = new Location(`${postUrlRoot}/open`);
export const ListMyPostsLocation = new Location(`${postUrlRoot}/my/:postType`, {
  postType: Yup.string().required(),
});
export const ListMyOffersLocation = new Location(`${postUrlRoot}/my/${PostTabsType.offers.valueOf()}`);
export const ListMyRequestLocation = new Location(`${postUrlRoot}/my/${PostTabsType.requests}`);
