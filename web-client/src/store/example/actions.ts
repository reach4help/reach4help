import { DECREMENT, INCREMENT, SUM } from './types';

export const incrementAction = {
  type: INCREMENT,
};

export const decrementAction = {
  type: DECREMENT,
};

export const sumAction = (value: number) => ({
  type: SUM,
  payload: {
    value,
  },
});

export const incrementAsyncAction = () => (dispatch: Function) => {

  setTimeout(() => dispatch(incrementAction), 1000);
};
