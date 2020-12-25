import { firestore } from 'src/firebase';
import { Post, PostFirestoreConverter, PostStatus } from 'src/models/posts';
import { User } from 'src/models/users';

export const createPost = async ({ postPayload }: { postPayload: Post }) =>
  firestore
    .collection('posts')
    .doc()
    .withConverter(PostFirestoreConverter)
    .set(postPayload);

export const setPost = async ({
  postPayload,
  postId,
}: {
  postPayload: Post;
  postId: string;
}) =>
  firestore
    .collection('posts')
    .doc(postId)
    .withConverter(PostFirestoreConverter)
    .set(postPayload);

export const observeAllMyPosts = (
  nextValue: Function,
  {
    requestingHelp,
    status,
    userRef,
  }: {
    requestingHelp: boolean;
    status?: string | null;
    userRef?: firebase.firestore.DocumentReference<User>;
  },
): firebase.Unsubscribe => {
  let queryWithoutStatusFilter = firestore
    .collection('posts')
    .where('creatorRef', '==', userRef)
    .where('requestingHelp', '==', requestingHelp);

  if (status !== null) {
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
    queryWithoutStatusFilter = queryWithoutStatusFilter.where(
      'status',
      'in',
      statusArray,
    );
  }

  return queryWithoutStatusFilter
    .withConverter(PostFirestoreConverter)
    .onSnapshot(snap => nextValue(snap));
};
