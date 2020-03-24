import { produce } from 'immer';
import { Reducer } from 'redux';

// Action Types
const INCREMENT = 'INCREMENT';
const SUM = 'SUM';
const DECREMENT = 'DECREMENT';
const FETCH_USERS = 'FETCH_USERS';
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

interface FetchUsersAction {
  type: typeof FETCH_USERS;
  payload: ExampleState;
}

interface FetchUsersActionCompleted {
  type: typeof FETCH_USERS_COMPLETED;
  payload: ExampleState;
}

type ActionTypes =
    | IncrementAction
    | DecrementAction
    | SumValueAction
    | FetchUsersAction
    | FetchUsersActionCompleted;

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
      draftState.users = action.payload;
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

const GetUsers = (request: Function) => {
  const axiosConfig = {
    method: 'GET',
    url: '/users',
  };

  return request(axiosConfig).then((response: any) => response.data);
};

export const fetchUsersAction = () => (dispatch: Function) => {

  dispatch({
    type: FETCH_USERS,
    api: GetUsers,
  });

};

export default exampleReducer;
