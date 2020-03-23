import { produce } from 'immer';
import { ExampleState, ExampleActionTypes, INCREMENT, DECREMENT, SUM } from './types';

const initialState: ExampleState = {
    value: 0,
}
// eslint-disable-next-line import/prefer-default-export
export const exampleReducer = (state: ExampleState = initialState, action: ExampleActionTypes): ExampleState => {
    return produce(state, draftState => {
        switch (action.type) {
            case INCREMENT:
                draftState.value += 1
                return draftState
            case DECREMENT:
                draftState.value -= 1
                return draftState
            case SUM:
                draftState.value += action.payload.value
                return draftState
            default:
                return draftState
        }
    })

}
