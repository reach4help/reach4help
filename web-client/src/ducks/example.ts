import { produce } from 'immer';
import { Reducer } from 'redux';
import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';

const { syncType, asyncType } = createActionTypeFactory('EXAMPLE');

// Action Types
const INCREMENT = syncType('INCREMENT');
const SUM = syncType('SUM');
const DECREMENT = syncType('DECREMENT');

const FETCH_USERS = asyncType('FETCH_USERS');

/* interface IncrementAction {
    type: typeof INCREMENT;
}

interface DecrementAction {
    type: typeof DECREMENT;
}

interface SumValueAction {
    type: typeof SUM;
    payload: ExampleState;
} */

/* interface FetchUsersAction {
  type: typeof FETCH_USERS;
  payload: ExampleState;
} 

type ActionTypes =
| IncrementAction
| DecrementAction
| SumValueAction
| FetchUsersAction; */
interface Action {
  type: string;
  payload?: any;
  meta?: any;
  api?: Function;
}

// Reducer

interface ExampleState {
  value: number;
  users: any;
}

const initialState: ExampleState = {
  value: 0,
  users: [],
};

export const exampleReducer: Reducer = (state: ExampleState = initialState, action: Action): ExampleState => produce(state, draftState => {
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
    case FETCH_USERS.COMPLETED:
      draftState.users = action.payload;
      return draftState;
    default:
      return draftState;
  }
});

// Action Creators

export const incrementAction = (): Action => ({
  type: INCREMENT,
});

export const decrementAction = (): Action => ({
  type: DECREMENT,
});

export const sumAction = (value: number): Action => ({
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
