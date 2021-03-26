import { isDefined } from 'class-validator';
import { firestore as firestoreNamespace } from 'firebase';
import { firebaseFirestore } from 'src/firebaseConfig';
import { GenericPostStatus } from 'src/models/posts/GenericPostStatus';
import { Post } from 'src/models/posts/Post';
import { PostFirestoreConverter } from 'src/models/posts/PostFirestoreConverter';
import { User } from 'src/models/users/User';

export const createPost = async (postPayload: Post) => {
  const tempPost = Post.factory(postPayload);
  tempPost.createdAt = firestoreNamespace.Timestamp.fromDate(new Date());
  tempPost.updatedAt = tempPost.createdAt;
  const postId = `P-${new Date().getTime().toString()}`;
  return firebaseFirestore
    .collection('posts')
    .doc(postId)
    .withConverter(PostFirestoreConverter)
    .set(tempPost);
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
  let filter: firebase.firestore.Query<firestoreNamespace.DocumentData> = firebaseFirestore.collection(
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
    const statusArray: string[] = [];
    if (status === 'Open' || status === 'Active') {
      statusArray.push(GenericPostStatus.ongoing);
      statusArray.push(GenericPostStatus.pending);
      statusArray.push(GenericPostStatus.open);
      statusArray.push(GenericPostStatus.active);
    }
    if (status === 'Closed') {
      statusArray.push(GenericPostStatus.completed);
      statusArray.push(GenericPostStatus.closed);
      statusArray.push(GenericPostStatus.removed);
    }
    filter = filter.where('status', 'in', statusArray);
  }

  return filter
    .withConverter(PostFirestoreConverter)
    .onSnapshot(snap => nextValue(snap));
};
