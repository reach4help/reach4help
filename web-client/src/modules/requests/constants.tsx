import Location from 'react-app-location';
import * as Yup from 'yup';

/*
 * :type is either 'request' or 'offer'
 */
export const PostListLocation = new Location('/requests/list/:type', {
  type: Yup.string(),
});
// ?? todo remove Accepted and Open
export const offersPostType = 'offers';
export const offersLocationStr = '/post/'+offersPostType;
export const requestsPostType = 'requests';
export const requestsLocationStr = '/requests/'+requestsPostType;

export const AcceptedRequestsLocation = new Location('/requests/accepted');
export const FindRequestsLocation = new Location('/requests/find');
export const OpenRequestsLocation = new Location('/requests/open');
export const OffersLocation = new Location(offersLocationStr);
export const RequestsLocation = new Location(requestsLocationStr);

