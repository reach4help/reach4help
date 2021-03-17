import { getPosts as observeFindRequestsFunc } from 'src/services/posts';

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
