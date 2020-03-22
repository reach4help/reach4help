import { INCREMENT, DECREMENT, SUM } from './types';


export function increment() {
    return {
        type: INCREMENT,
    };
}

export function decrement() {
    return {
        type: DECREMENT,
    };
}

export function sum(value: number) {
    return {
        type: SUM,
        payload: {
            value
        }
    };
}
