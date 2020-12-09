import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import reduxThunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const confirmDelete = (store) => (next) => (action) => {
    console.log('se ejecuta el middleware con ', action)    
    if(action.type === 'REMOVE_PRODUCT'){
        console.log('entra al if')
        let conf = window.confirm('Eliminamos??')
        console.log('la respuesta conf es: '+ conf)
        if(conf){
            console.log('se ejecuta el primer next')
            next(action)
        }
    } else {
        console.log('se ejecuta el segundo next')
        next(action)
    }
}

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(reduxThunk, confirmDelete)
    )
);

export default store;