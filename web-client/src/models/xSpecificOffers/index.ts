/* eslint no-underscore-dangle: 0 */
// TODO: (ES) changing to force format, remove
import { IPost, Post, PostFirestoreConverter } from '../posts';

export interface IXSpecificOffer extends IPost {
  dummy?: string;
}

export class XSpecificOffer extends Post {}

export const XSpecificOfferFirestoreConverter: firebase.firestore.FirestoreDataConverter<XSpecificOffer> = PostFirestoreConverter;
