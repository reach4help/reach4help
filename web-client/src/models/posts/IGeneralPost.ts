import { PostStatus } from "../PostStatus";
import { IUnauthenticatedPost } from "../IUnauthenticatedPost";
import { IUserGeneral } from "../users/IUserGeneral";


export interface IGeneralPost extends IUnauthenticatedPost {
  creatorRef: string;
  creatorSnapshot: IUserGeneral;
  status: PostStatus;
  streetAddress: string;
  participants: string[];
  rejected: string[];
  offerCount: number;
  rejectionCount: number;
  firstOfferMade: Date | null;
  firstRejectionMade: Date | null;
  seenBy: string[];
}
