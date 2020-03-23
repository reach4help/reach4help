import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { exampleReducer } from './example/reducers'

const rootReducer = combineReducers({ exampleReducer })

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    // const middlewares = [thunkMiddleware];
    
    const store = createStore(
        rootReducer,
        process.env.NODE_ENV === 'development' ? composeWithDevTools() : undefined
    );

    return store;
}
