import { firestore } from 'src/firebase';
import { TimelineItemFirestoreConverter } from 'src/models/requests/timeline';
import { DataReferenceType } from 'src/types';

export const getTimelinesForPost = (
    // nextValue: Function,
  payload: { postRef: DataReferenceType},
) => // firebase.Unsubscribe =>
  firestore
    .collection('requests')
    .doc(payload.postRef.path)
    .collection('timeline')
    .withConverter(TimelineItemFirestoreConverter);
    // .onSnapshot(snap => nextValue(snap));
