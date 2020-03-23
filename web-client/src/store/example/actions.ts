import { INCREMENT, DECREMENT, SUM } from './types';

export const incrementAction = {
        type: INCREMENT,
}

export const decrementAction = {
        type: DECREMENT,
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

      setTimeout(() => dispatch(incrementAction), 1000);
    };
  }
