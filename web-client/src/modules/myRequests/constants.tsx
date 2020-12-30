import Location from 'react-app-location';
import * as Yup from 'yup';

export const RootUrl = '/list';

export enum PostTabTypes {
  requests = 'requests',
  offers = 'offers',
}

// TODO: (es) Pick between these two methods
export const AlgFindRequestsLocation = new Location(`${RootUrl}/find`);
export const FindRequestsLocation = new Location(`${RootUrl}/otherfind`);
export const MyPostsLocation = new Location(`${RootUrl}/my/:postType`, {
  postType: Yup.string().required(),
});

export const MyOfferPostsLocationUrl = MyPostsLocation.toUrl({
  postType: PostTabTypes.offers,
});
export const MyRequestPostsLocationUrl = MyPostsLocation.toUrl({
  postType: PostTabTypes.requests,
});

export const Algolia = {
  appId: process.env.REACT_APP_TEMP_ALGOLIA_APP_ID ?? '',
  tempSearchKey: process.env.REACT_APP_TEMP_ALGOLIA_SEARCH_KEY ?? '',
  tempAuthIndexName: 'generalRequests_dev',
  tempUnauthIndexName: 'unauthenticatedReqeusts_dev',
};
