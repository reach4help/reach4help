import { IUser } from '../users/IUser';
import { GenericPostStatus } from './GenericPostStatus';
import { IPost } from './IPost';

export interface IGeneralPost extends IPost {
  creatorRef: string;
  creatorSnapshot: IUser;
  genericStatus: GenericPostStatus;
  streetAddress: string;
}
