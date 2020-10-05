import Location from 'react-app-location';
import * as Yup from 'yup';

/*
 * :type is either 'request' or 'offer'
 */
export const CreatePostLocation = new Location('/create/post/:type', {
  type: Yup.string(),
});

export enum CreatePostTypes {
  request = 'request',
  offer = 'offer',
}
