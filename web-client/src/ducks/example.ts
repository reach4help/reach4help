import { produce } from 'immer';
import { Reducer } from 'redux';

import request from '../http/Request';

// Action Types
const INCREMENT = 'INCREMENT';
const SUM = 'SUM';
const DECREMENT = 'DECREMENT';
const FETCH_USERS_COMPLETED = 'FETCH_USERS_COMPLETED';

interface IncrementAction {
    type: typeof INCREMENT;
}

interface DecrementAction {
    type: typeof DECREMENT;
}

interface SumValueAction {
    type: typeof SUM;
    payload: ExampleState;
}

interface FetchUsersCompletedAction {
  type: typeof FETCH_USERS_COMPLETED;
  payload: ExampleState;
}

type ActionTypes =
    | IncrementAction
    | DecrementAction
    | SumValueAction
    | FetchUsersCompletedAction;

// Reducer

interface ExampleState {
  value: number;
  users: any;
}

const initialState: ExampleState = {
  value: 0,
  users: [],
};

export const exampleReducer: Reducer = (state: ExampleState = initialState, action: ActionTypes): ExampleState => produce(state, draftState => {
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

// Action Creators

export const incrementAction = (): IncrementAction => ({
  type: INCREMENT,
});

export const decrementAction = (): DecrementAction => ({
  type: DECREMENT,
});

export const sumAction = (value: number) => ({
  type: SUM,
  payload: {
    value,
  },
});

const fetchUsersCompleted = (data: any) => ({
  type: FETCH_USERS_COMPLETED,
  payload: {
    users: data,
  },
});

export const fetchUsersAction = () => (dispatch: Function) => {
  request({
    method: 'GET',
    url: '/users',
  })
    .then(req => req.data.data)
    .then(data => dispatch(fetchUsersCompleted(data)));
};

export default exampleReducer;
