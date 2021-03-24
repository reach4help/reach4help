import { IUser } from '../users/IUser';
import { GenericPostStatus } from './GenericPostStatus';

export interface IPost extends firebase.firestore.DocumentData {
  postRef: string;
  isResponse: boolean;
  isRequest: boolean;
  creatorRef: string;
  creatorSnapshot: IUser;
  genericStatus: GenericPostStatus;
  title: string;
  description: string;
  streetAddress: string;
  latLng: firebase.firestore.GeoPoint;
  status: GenericPostStatus;
  createdAt?: firebase.firestore.Timestamp;
  updatedAt?: firebase.firestore.Timestamp;
}
