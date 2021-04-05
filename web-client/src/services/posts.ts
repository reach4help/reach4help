import { isDefined } from 'class-validator';
import firebase from 'firebase/app';
import { firebaseFirestore } from 'src/firebaseConfig';
import { Post } from 'src/models/posts/Post';
import { PostFirestoreConverter } from 'src/models/posts/PostFirestoreConverter';
import { User } from 'src/models/users/User';

export const createPost = async (postPayload: Post) => {
  const tempPost = Post.factory(postPayload);
  tempPost.createdAt = firebase.firestore.Timestamp.fromDate(new Date());
  tempPost.updatedAt = tempPost.createdAt;
  const postId = `P-${new Date().getTime().toString()}`;
  const success = await firebaseFirestore
    .collection('posts')
    .doc(postId)
    .withConverter(PostFirestoreConverter)
    .set(tempPost);
  return success;
};

export const updatePost = async (postPayload: Post, postId: string) =>
  firebaseFirestore
    .collection('posts')
    .doc(postId)
    .withConverter(PostFirestoreConverter)
    .set(postPayload);

export const observePosts = (
  nextValue: Function,
  {
    isRequest,
    offeringHelp,
    status,
    userRef,
  }: {
    isRequest?: boolean;
    offeringHelp?: boolean;
    status?: string;
    userRef?: firebase.firestore.DocumentReference<User>;
  },
): firebase.Unsubscribe => {
  let filter: firebase.firestore.Query<firebase.firestore.DocumentData> = firebaseFirestore.collection(
    'posts',
  );

  if (userRef) {
    filter = filter.where('creatorRef', '==', userRef);
  }

  if (isDefined(isRequest)) {
    filter = filter.where('isRequest', '==', isRequest);
  }

  if (isDefined(offeringHelp)) {
    filter = filter.where('isRequest', '==', !offeringHelp);
  }

  if (status) {
    filter = filter.where('status', '==', status);
  }

  return filter
    .withConverter(PostFirestoreConverter)
    .onSnapshot(snap => nextValue(snap));
};
