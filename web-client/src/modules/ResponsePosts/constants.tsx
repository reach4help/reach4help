import Location from 'react-app-location';
import * as Yup from 'yup';

export const RootUrl = '/show';

export enum PostTabTypes {
  requests = 'requests',
  offers = 'offers',
}

// TODO: (es) Pick between these two methods
export const ResponsePostsForPostLocation = new Location(
  `${RootUrl}/:postType/:id`,
  {
    postType: Yup.string().required(),
    sourcePostId: Yup.string().required(),
  },
);

export const ResponseOfferPostsForPostLocationUrl = ResponsePostsForPostLocation.toUrl(
  {
    postType: PostTabTypes.offers,
  },
);

export const ResponseRequestPostsForPostLocationUrl = ResponsePostsForPostLocation.toUrl(
  {
    postType: PostTabTypes.requests,
  },
);
