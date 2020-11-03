import { combineReducers  } from 'redux';
import productReducer from './productReducer';
import categoryReducer from './categoryReducer';
import userReducer from './userReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';
import reviewReducer from './reviewReducer';
import generalReducer from './generalReducer';


const rootReducer = combineReducers ({
    productReducer,
    categoryReducer,
    userReducer,
    cartReducer,
    orderReducer,
    reviewReducer,
    generalReducer
})

export default rootReducer;