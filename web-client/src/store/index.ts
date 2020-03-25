import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import ducks from '../ducks';
import injectRequestMiddleware from './middlewares/injectRequestMiddleware';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const rootReducer = combineReducers(ducks);

export type AppState = ReturnType<typeof rootReducer>;

const configureStore = () => {
  const middlewares = [thunk, injectRequestMiddleware];

  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(...middlewares),
      process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        composeWithDevTools() : (f: Function) => f,
    ),
  );

  return store;
};

export default configureStore;
