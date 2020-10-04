import Location from 'react-app-location';

/*
 * :type is either 'ask' or 'offer'
 */
export const TabbedRequestsLocation = new Location('/requests/list/:type');
export const AcceptedRequestsLocation = new Location('/requests/accepted');
export const FindRequestsLocation = new Location('/requests/find');
export const NewRequestsLocation = new Location('/requests/new');
export const OpenRequestsLocation = new Location('/requests/open');
