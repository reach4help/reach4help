
export interface ExampleState {
    value: number;
}

export const INCREMENT = 'INCREMENT';
export const SUM = 'SUM';
export const DECREMENT = 'DECREMENT';

export interface IncrementAction {
    type: typeof INCREMENT;
}

export interface DecrementAction {
    type: typeof DECREMENT;
}

export interface SumValueAction {
    type: typeof SUM;
    payload: ExampleState;
}

export type ExampleActionTypes = IncrementAction | DecrementAction | SumValueAction;