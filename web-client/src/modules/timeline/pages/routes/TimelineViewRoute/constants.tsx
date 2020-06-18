import Location from 'react-app-location';
import * as Yup from 'yup';

export const TimelineViewLocation = new Location('/timeline/:requestId', {
  requestId: Yup.string().required(),
});
