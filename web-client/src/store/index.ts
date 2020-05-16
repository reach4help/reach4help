import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import ducks from '../ducks';
import injectRequestMiddleware from './middlewares/injectRequestMiddleware';
import observerMiddleware from './middlewares/observerMiddleware';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const rootReducer = combineReducers(ducks);

export type AppState = ReturnType<typeof rootReducer>;

const configureStore = () => {
  const middlewares = [thunk, injectRequestMiddleware, observerMiddleware];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
  }

  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(...middlewares),
      process.env.NODE_ENV === 'development' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? composeWithDevTools()
        : (f: Function) => f,
    ),
  );

  return store;
};

export default configureStore;
