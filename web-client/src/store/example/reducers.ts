import { produce } from 'immer';

import { DECREMENT, ExampleActionTypes, ExampleState, FETCH_USERS_COMPLETED, INCREMENT, SUM } from './types';

const initialState: ExampleState = {
  value: 0,
  users: [],
};
// eslint-disable-next-line import/prefer-default-export
export const exampleReducer = (state: ExampleState = initialState, action: ExampleActionTypes): ExampleState => produce(state, draftState => {
  switch (action.type) {
    case INCREMENT:
      draftState.value += 1;
      return draftState;
    case DECREMENT:
      draftState.value -= 1;
      return draftState;
    case SUM:
      draftState.value += action.payload.value;
      return draftState;
    case FETCH_USERS_COMPLETED:
      draftState.users = action.payload.users;
      return draftState;
    default:
      return draftState;
  }
});
