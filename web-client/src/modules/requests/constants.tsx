import Location from 'react-app-location';
import * as Yup from 'yup';

/*
 * :type is either 'request' or 'offer'
 */
export const PostListLocation = new Location('/requests/list/:type', {
  type: Yup.string(),
});
export const AcceptedRequestsLocation = new Location('/requests/accepted');
export const FindRequestsLocation = new Location('/requests/find');
export const OpenRequestsLocation = new Location('/requests/open');

export enum PostsListTypes {
  request = 'request',
  offer = 'offer',
}
