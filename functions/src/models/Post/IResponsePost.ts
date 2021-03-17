import { IUser } from '../users/IUser';
import { IPost } from './IPost';
import { ResponsePostStatus } from './ResponsePostStatus';

export interface IResponsePost extends IPost {
  creatorRef: string;
  creatorSnapshot: IUser;
  responseStatus: ResponsePostStatus;
  streetAddress: string;
  participants: string[];
  rejected: string[];
}
