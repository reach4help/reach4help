import { firestore } from 'src/firebase';
import { TimelineItemFirestoreConverter } from 'src/models/requests/timeline';

export const getTimelinesForPost = (
  // nextValue: Function,
  payload: { postId: string }, // TODO: (es) firebase.Unsubscribe =>
) =>
  firestore
    .collection('requests')
    .doc(payload.postId)
    .collection('timeline')
    .withConverter(TimelineItemFirestoreConverter);
// TODO (es): .onSnapshot(snap => nextValue(snap));
