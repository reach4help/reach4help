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
    const shouldUnsubscribe = observerManagerInstance.unsubscribe(
      action.observerName,
    );
    if (shouldUnsubscribe) {
      return next({
        type: `${action.type}`,
      });
    }
    return;
  }

  if (action.observer && typeof action.observer === 'function') {
    const nextValue = (...values: any) => {
      dispatch({
        type: `${action.type}_UPDATED`,
        payload: { ...values },
      });
    };

    try {
      const subscribe: SubscribeFunction = () => {
        dispatch({
          type: `${action.type}_SUBSCRIBE`,
        });
        return action.observer?.(nextValue, action.payload);
      };

      observerManagerInstance.register(action.type, subscribe);

      return;
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
