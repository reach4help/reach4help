import { IPost } from './IPost';
import { Post } from './Post';

export const PostFirestoreConverter: firebase.firestore.FirestoreDataConverter<Post> = {
  fromFirestore: (data: firebase.firestore.QueryDocumentSnapshot<IPost>): Post => Post.factory(data.data()),
  toFirestore: (modelObject: Post): firebase.firestore.DocumentData => modelObject.toObject(),
};
