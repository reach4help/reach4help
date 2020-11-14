import Location from 'react-app-location';
import * as Yup from 'yup';

export enum CreatePostTypes {
  request = 'request',
  offer = 'offer',
}

/*
 * :type is either 'request' or 'offer'
 */
export const CreatePostLocation = new Location('/create/post/:createPostType', {
  createPostType: Yup.string(),
});
export const CreateOfferLocationUrl = CreatePostLocation.toUrl({
  createPostType: CreatePostTypes.offer,
});
export const CreateRequestLocationUrl = CreatePostLocation.toUrl({
  createPostType: CreatePostTypes.request,
});
