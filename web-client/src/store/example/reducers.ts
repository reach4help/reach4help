import { ExampleState, ExampleActionTypes, INCREMENT, DECREMENT, SUM } from './types';

const initialState: ExampleState = {
    value: 0,
}
// eslint-disable-next-line import/prefer-default-export
export const exampleReducer = (state: ExampleState = initialState, action: ExampleActionTypes): ExampleState => {
    const nextState = { ...state };
    switch (action.type) {
        case INCREMENT:
            nextState.value = + 1
            return nextState
        case DECREMENT:
            nextState.value = - 1
            return nextState
        case SUM:
            nextState.value += action.payload.value
            return nextState
        default:
            return state
    }
}
