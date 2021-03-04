import Location from 'react-app-location';
import * as Yup from 'yup';

export const RootUrl = '/list';

export enum PostTabTypes {
  requests = 'requests',
  offers = 'offers',
}

export enum PostStatusType {
  all = 'all',
  onGoing = 'ongoing',
  open = 'open',
  closed = 'closed',
}

// TODO: (es) Pick between these two methods
export const AlgFindRequestsLocation = new Location(`${RootUrl}/find`);
export const FindRequestsLocation = new Location(`${RootUrl}/otherfind`);
export const MyPostsLocation = new Location(
  `${RootUrl}/my/:postType/:status?`,
  {
    postType: Yup.string().required(),
    status: Yup.string().notRequired(),
  },
);

export const MyOfferPostsLocationUrl = MyPostsLocation.toUrl({
  postType: PostTabTypes.offers,
});
export const MyRequestPostsLocationUrl = MyPostsLocation.toUrl({
  postType: PostTabTypes.requests,
});

export const MyOfferPostsStatusAllUrl = MyPostsLocation.toUrl({
  postType: PostTabTypes.offers,
  status: PostStatusType.all,
});

export const MyOfferPostsStatusOnGoingUrl = MyPostsLocation.toUrl({
  postType: PostTabTypes.offers,
  status: PostStatusType.onGoing,
});

export const MyOfferPostsStatusOpenUrl = MyPostsLocation.toUrl({
  postType: PostTabTypes.offers,
  status: PostStatusType.open,
});
export const MyOfferPostsStatusClosedUrl = MyPostsLocation.toUrl({
  postType: PostTabTypes.offers,
  status: PostStatusType.closed,
});

export const MyRequestPostsStatusAllUrl = MyPostsLocation.toUrl({
  postType: PostTabTypes.requests,
  status: PostStatusType.all,
});

export const MyRequestPostsStatusOnGoingUrl = MyPostsLocation.toUrl({
  postType: PostTabTypes.requests,
  status: PostStatusType.onGoing,
});

export const MyRequestPostsStatusOpenUrl = MyPostsLocation.toUrl({
  postType: PostTabTypes.requests,
  status: PostStatusType.open,
});
export const MyRequestPostsStatusClosedUrl = MyPostsLocation.toUrl({
  postType: PostTabTypes.requests,
  status: PostStatusType.closed,
});

export const Algolia = {
  appId: process.env.REACT_APP_TEMP_ALGOLIA_APP_ID ?? '',
  tempSearchKey: process.env.REACT_APP_TEMP_ALGOLIA_SEARCH_KEY ?? '',
  tempAuthIndexName: 'generalRequests_dev',
  tempUnauthIndexName: 'unauthenticatedReqeusts_dev',
};
