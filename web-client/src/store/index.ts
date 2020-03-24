import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { exampleReducer } from './example/reducers';

const rootReducer = combineReducers({ exampleReducer });

export type AppState = ReturnType<typeof rootReducer>;

const configureStore = () => {
  const middlewares = [thunk];

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
