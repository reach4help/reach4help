import { observePosts as observeFindRequestsFunc } from '../posts/functions';

export const observeFindRequests = (
  nextValue: Function,
  {
    lat,
    lng,
  }: {
    lat: number;
    lng: number;
  },
) => observeFindRequestsFunc(nextValue, { requestingHelp: true, lat, lng });
