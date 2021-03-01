import Location from 'react-app-location';
import * as Yup from 'yup';

export const RootUrl = '/list/my';

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
export const AlgFindRequestsLocation = new Location(`${RootUrl}/algfind`);
export const FindRequestsLocation = new Location(`${RootUrl}/find`);
export const MyPostsLocation = new Location(`${RootUrl}/:postType`, {
  postType: Yup.string().required(),
});

export const MyOfferPostsLocationUrl = MyPostsLocation.toUrl({
  postType: PostTabTypes.offers,
});

export const MyRequestPostsLocationUrl = MyPostsLocation.toUrl({
  postType: PostTabTypes.requests,
});
it 