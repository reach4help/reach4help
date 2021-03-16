import { IUserGeneral } from '../users/IUserGeneral';
import { IUnauthenticatedPost } from './IUnauthenticatedPost';
import { GenericPostStatus } from './GenericPostStatus';

export interface IGeneralPost extends IUnauthenticatedPost {
  creatorRef: string;
  creatorSnapshot: IUserGeneral;
  status: GenericPostStatus;
  streetAddress: string;
  participants: string[];
  rejected: string[];
}
