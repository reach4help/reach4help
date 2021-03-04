import { ILatLngObject } from './ILatLngObject';
import { IStrippedUser } from '../users/IStrippedUser';


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
