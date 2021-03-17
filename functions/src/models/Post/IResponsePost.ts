import { IPost } from './IPost';
import { ResponsePostStatus } from './ResponsePostStatus';

export interface IResponsePost extends IPost {
  responseStatus: ResponsePostStatus;
}
