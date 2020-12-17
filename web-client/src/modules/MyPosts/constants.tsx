import Location from 'react-app-location';
import * as Yup from 'yup';

export const RootUrl = '/list/my';

export enum PostTabTypes {
  requests = 'requests',
  offers = 'offers',
}

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
