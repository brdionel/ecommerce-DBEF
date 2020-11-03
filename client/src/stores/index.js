import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import reduxThunk from 'redux-thunk';

console.log('rootReducer es: '+rootReducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(reduxThunk)
    )
);

export default store;