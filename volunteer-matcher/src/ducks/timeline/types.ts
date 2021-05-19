import { TimelineItem } from 'src/models/requests/timeline';
import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';

export const { asyncType, observerType, syncType } = createActionTypeFactory(
  'REQUESTS',
);

export const OBSERVE_TIMELINE = observerType('OBSERVE_TIMELINE');

export interface TimelineState {
  observerReceivedFirstUpdate: boolean;
  loading: boolean;
  data?: TimelineItem[];
  error?: Error;
}

export interface IgetTimeline {
  requestId: string;
}
