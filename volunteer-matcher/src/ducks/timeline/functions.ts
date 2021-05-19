import { firestore } from 'src/firebase';
import { TimelineItemFirestoreConverter } from 'src/models/requests/timeline';

import { IgetTimeline } from './types';

export const observeTimelinesFunc = (
  nextValue: Function,
  payload: IgetTimeline,
): firebase.Unsubscribe =>
  firestore
    .collection('requests')
    .doc(payload.requestId)
    .collection('timeline')
    .withConverter(TimelineItemFirestoreConverter)
    .onSnapshot(snap => nextValue(snap));
