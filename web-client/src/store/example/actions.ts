import { INCREMENT, DECREMENT, SUM } from './types';

export function incrementAction() {
    return {
        type: INCREMENT,
    };
}

export function decrementAction() {
    return {
        type: DECREMENT,
    };
}

export function sumAction(value: number) {
    return {
        type: SUM,
        payload: {
            value
        }
    };
}

export function incrementAsyncAction() {
    return (dispatch: Function) => {
      setTimeout(() => {
        dispatch(incrementAction());
      }, 1000);
    };
  }
