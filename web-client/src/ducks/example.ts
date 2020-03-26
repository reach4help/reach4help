import { GetUsers } from 'src/http/resources/users';
import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';
import createReducer, { Action } from 'src/store/utils/createReducer';

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

// Reducer

interface ExampleState {
  value: number;
  users: any;
}

const initialState: ExampleState = {
  value: 0,
  users: [],
};

const exampleReducer = createReducer<ExampleState>({
  [INCREMENT]: (state: ExampleState) => {
    state.value += 1;
  },
  [DECREMENT]: (state: ExampleState) => {
    state.value -= 1;
  },
  [SUM]: (state: ExampleState, { payload }: { payload: any }) => {
    state.value += payload.value;
  },
  [FETCH_USERS.COMPLETED]: (state: ExampleState, { payload }: { payload: any }) => {
    state.users = payload;
  },
}, initialState);

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

export const fetchUsersAction = () => (dispatch: Function) => {

  dispatch({
    type: FETCH_USERS,
    api: GetUsers,
  });

};

export default exampleReducer;
