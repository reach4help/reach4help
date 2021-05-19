import { produce } from 'immer';
import { Reducer } from 'redux';

export interface Action {
  type: string;
  payload?: any;
  meta?: any;
  api?: Function;
  firebase?: Function;
}

const createReducer = <T>(
  funcMap: Record<string, Function>,
  initialState: T,
): Reducer<T> => (state = initialState, action: Action) =>
  Object.prototype.hasOwnProperty.call(funcMap, action.type)
    ? produce(state, (draft: T) => funcMap[action.type](draft, action))
    : state;

export default createReducer;
