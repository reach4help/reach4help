import { IUser } from '../users';
import { GenericPostStatus } from './GenericPostStatus';

export interface IPost extends firebase.firestore.DocumentData {
  isResponse: boolean;
  isRequest: boolean;
  creatorSnapshot: IUser;
  title: string;
  description: string;
  streetAddress: string;
  latLng: firebase.firestore.GeoPoint;
  status: GenericPostStatus;
  createdAt?: firebase.firestore.Timestamp;
  updatedAt?: firebase.firestore.Timestamp;
}
