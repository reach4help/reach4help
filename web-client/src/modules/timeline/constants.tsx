import Location from 'react-app-location';
import * as Yup from 'yup';

export const TimelineOfferPostViewLocation = new Location(
  '/timeline/accepted/:requestId',
  {
    requestId: Yup.string().required(),
  },
);

export const TimelineViewLocation = new Location('/timeline/:requestId', {
  requestId: Yup.string().required(),
});
