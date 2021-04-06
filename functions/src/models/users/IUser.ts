import firebase from 'firebase/app';
import { INewUserParams } from './INewUserParams';
export interface IUser extends INewUserParams {
  casesCompleted: number;
  postsMade: number;
  createdAt: firebase.firestore.Timestamp;
  toObject: () => object;
}
