import { observeTimelinesFunc } from './functions';
import { IgetTimeline, OBSERVE_TIMELINE } from './types';

export const observeTimeline = (
  dispatch: Function,
  payload: IgetTimeline,
): (() => void) => {
  dispatch({
    type: OBSERVE_TIMELINE,
    observer: observeTimelinesFunc,
    payload,
  });

  return () =>
    dispatch({
      type: OBSERVE_TIMELINE.UNSUBSCRIBE,
      observerName: OBSERVE_TIMELINE,
    });
};
