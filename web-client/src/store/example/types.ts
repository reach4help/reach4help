export interface ExampleState {
    value: number;
    users: any;
}

export const INCREMENT = 'INCREMENT';
export const SUM = 'SUM';
export const DECREMENT = 'DECREMENT';
export const FETCH_USERS_COMPLETED = 'FETCH_USERS_COMPLETED';

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

export interface FetchUsersCompletedAction {
    type: typeof FETCH_USERS_COMPLETED;
    payload: ExampleState;
}

export type ExampleActionTypes = IncrementAction | DecrementAction | SumValueAction | FetchUsersCompletedAction;
