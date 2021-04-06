import { INewPostParams } from './INewPostParams';

export interface IPost extends INewPostParams {
  postUuid: string;
}
