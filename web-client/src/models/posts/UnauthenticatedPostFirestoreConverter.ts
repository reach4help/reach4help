import { IUnauthenticatedPost } from './IUnauthenticatedPost';
import { UnauthenticatedPost } from './UnauthenticatedPost';


export const UnauthenticatedPostFirestoreConverter: firebase.firestore.FirestoreDataConverter<UnauthenticatedPost> = {
  fromFirestore: (
    data: firebase.firestore.QueryDocumentSnapshot<IUnauthenticatedPost>
  ): UnauthenticatedPost => UnauthenticatedPost.fromFirestore(data.data()),
  toFirestore: (
    modelObject: UnauthenticatedPost
  ): firebase.firestore.DocumentData => modelObject.toFirestore(),
};
