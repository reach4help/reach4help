import { firestore } from 'firebase';

import { Offer } from '../offers';
import { MakePartial } from '../util';
import { Request } from './index';

export interface TimelineItem {
  offerSnapshot: Offer;
  requestSnapshot: Request;
  createdAt: firebase.firestore.Timestamp;
}

/**
 * Initialize with default values
 */
export const initTimelineItem = (
  t: MakePartial<TimelineItem, 'createdAt'>,
): TimelineItem => ({
  createdAt: firestore.Timestamp.now(),
  ...t,
});
