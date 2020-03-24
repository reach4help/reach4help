import { produce } from 'immer';
import { Reducer } from 'redux';

// Action Types
const INCREMENT = 'INCREMENT';
const SUM = 'SUM';
const DECREMENT = 'DECREMENT';

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

type ActionTypes =
    | IncrementAction
    | DecrementAction
    | SumValueAction;

// Reducer

interface ExampleState {
  value: number;
}

const initialState: ExampleState = {
  value: 0,
};

const exampleReducer: Reducer = (state: ExampleState = initialState, action: ActionTypes): ExampleState => produce(state, draftState => {
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

export const sumAction = (value: number): SumValueAction => ({
  type: SUM,
  payload: {
    value,
  },
});

export const incrementAsyncAction = () => (dispatch: Function): void => {

  setTimeout(() => dispatch(incrementAction()), 1000);
};

export default exampleReducer;
