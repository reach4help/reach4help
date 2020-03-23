import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import { exampleReducer } from './example/reducers'

const rootReducer = combineReducers({ exampleReducer })

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const middlewares = [thunk];
    
    const store = createStore(
        rootReducer,
        compose(
            applyMiddleware(...middlewares),
            process.env.NODE_ENV === 'development' ? composeWithDevTools() : (f: Function) => f
        )
    );

    return store;
}
