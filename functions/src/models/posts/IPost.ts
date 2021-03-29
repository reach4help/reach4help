import firebase from 'firebase/app';
import { IUser } from '../users/IUser';
import { GenericPostStatus } from './GenericPostStatus';

export interface IPost extends firebase.firestore.DocumentData {
  postRef: string;
  isResponse: boolean;
  isRequest: boolean;
  creatorRef: string;
  creatorSnapshot: IUser;
  postStatus: GenericPostStatus;
  title: string;
  description: string;
  streetAddress: string;
  latLng: firebase.firestore.GeoPoint;
  createdAt?: firebase.firestore.Timestamp;
  updatedAt?: firebase.firestore.Timestamp;
}
