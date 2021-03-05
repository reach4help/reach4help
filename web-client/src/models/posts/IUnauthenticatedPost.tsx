import { IStrippedUser } from '../users/IStrippedUser';
import { ILatLngObject } from './ILatLngObject';

export interface IUnauthenticatedPost {
  postRef: string;
  requestingHelp: boolean;
  creatorSnapshot: IStrippedUser;
  title: string;
  description: string;
  latLng: ILatLngObject;
  createdAt?: Date;
  updatedAt?: Date;
}
