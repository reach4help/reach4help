import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import ducks from '../ducks';
import injectRequestMiddleware from './middlewares/injectRequestMiddleware';

const rootReducer = combineReducers(ducks);

export type AppState = ReturnType<typeof rootReducer>;

const configureStore = () => {
  const middlewares = [thunk, injectRequestMiddleware];

  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(...middlewares),
      process.env.NODE_ENV === 'development' ? composeWithDevTools() : (f: Function) => f,
    ),
  );

  return store;
};

export default configureStore;
