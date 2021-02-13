import { isDefined } from 'class-validator';
import { firestore as firestore2 } from 'firebase';
import { firestore } from 'src/firebase';
import { Post, PostFirestoreConverter, PostStatus } from 'src/models/posts';
import { User } from 'src/models/users';

export const createPost = async (postPayload: Post) => {
  const tempPost = Post.factory(postPayload);
  tempPost.createdAt = firestore2.Timestamp.fromDate(new Date());
  tempPost.updatedAt = tempPost.createdAt;
  tempPost.postId = `P-${new Date().getTime().toString()}`;
  return firestore
    .collection('posts')
    .doc(tempPost.postId)
    .withConverter(PostFirestoreConverter)
    .set(tempPost);
};

export const updatePost = async (postPayload: Post, postId: string) =>
  firestore
    .collection('posts')
    .doc(postId)
    .withConverter(PostFirestoreConverter)
    .set(postPayload);

export const observePosts = (
  nextValue: Function,
  {
    requestingHelp,
    offeringHelp,
    status,
    userRef,
  }: {
    requestingHelp?: boolean;
    offeringHelp?: boolean;
    status?: string;
    userRef?: firebase.firestore.DocumentReference<User>;
  },
): firebase.Unsubscribe => {
  let filter = firestore
    .collection('posts')
    .where('isResponse', 'in', [true, false]); // TODO: (es) figure out how to eliminate

  if (userRef) {
    filter = filter.where('userRef', '==', userRef);
  }

  if (isDefined(requestingHelp)) {
    filter = filter.where('requestingHelp', '==', requestingHelp);
  }

  if (isDefined(offeringHelp)) {
    filter = filter.where('requestingHelp', '==', !offeringHelp);
  }

  if (status) {
    const statusArray: string[] = [];
    if (status === 'Open' || status === 'Active') {
      statusArray.push(PostStatus.ongoing);
      statusArray.push(PostStatus.pending);
      statusArray.push(PostStatus.open);
      statusArray.push(PostStatus.active);
    }
    if (status === 'Closed') {
      statusArray.push(PostStatus.completed);
      statusArray.push(PostStatus.closed);
      statusArray.push(PostStatus.removed);
    }
    filter = filter.where('status', 'in', statusArray);
  }

  return filter
    .withConverter(PostFirestoreConverter)
    .onSnapshot(snap => nextValue(snap));
};
