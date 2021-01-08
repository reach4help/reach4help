/* eslint no-underscore-dangle: 0 */
// TODO: (ES) changing to force format, remove
import { IPost, Post, PostFirestoreConverter } from '../posts';

export interface IXGeneralRequest extends IPost {
  dummy?: string;
}

export class XGeneralRequest extends Post {}

export const XGeneralRequestFirestoreConverter: firebase.firestore.FirestoreDataConverter<XGeneralRequest> = PostFirestoreConverter;
