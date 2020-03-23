import { DECREMENT, INCREMENT, SUM } from './types';

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
      value,
    },
  };
}
