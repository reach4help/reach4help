import { IUserGeneral } from '../users/IUserGeneral';
import { IUnauthenticatedPost } from './IUnauthenticatedPost';
import { PostStatus } from './PostStatus';

export interface IGeneralPost extends IUnauthenticatedPost {
  creatorRef: string;
  creatorSnapshot: IUserGeneral;
  status: PostStatus;
  streetAddress: string;
  participants: string[];
  rejected: string[];
  offerCount: number;
  rejectionCount: number;
  firstResponseMade: Date | null;
  firstRejectionMade: Date | null;
  seenBy: string[];
}
