import { SubscribeFunction } from '../types';
import ObserverManager from '../utils/ObserverManager';

export interface ObserverAction {
  type: string;
  observer?: Function;
  observerName?: string;
  payload?: any;
}

const observerMiddleware = ({ dispatch }: { dispatch: Function }) => (
  next: Function,
) => (action: ObserverAction) => {
  const observerManagerInstance = ObserverManager.getInstance();
  if (action.observerName && action.observerName === 'string') {
    observerManagerInstance.unsubscribe(action.observerName);
    return next({
      type: `${action.type}`,
    });
  }

  if (action.observer && typeof action.observer === 'function') {
    dispatch({
      type: `${action.type}_SUBSCRIBE`,
    });

    const nextValue = (...values: any) => {
      dispatch({
        type: `${action.type}_UPDATED`,
        payload: { ...values },
      });
    };

    try {
      const subscribe: SubscribeFunction = () =>
        action.observer?.(nextValue, action.payload);
      observerManagerInstance.register(action.type, subscribe);
    } catch (error) {
      observerManagerInstance.unsubscribe(action.type);
      return next({
        type: `${action.type}_ERROR`,
        payload: error,
      });
    }
  }
  return next(action);
};

export default observerMiddleware;
