import { GET_ALL_ORDERS, GET_CANCEL_ORDERS, GET_CLOSED_ORDERS, GET_DISPATCHED_ORDERS, 
    GET_ORDER_DETAIL, GET_PENDING_ORDERS, CLEAN_ORDER, ORDER_STATE_CHANGE} from '../types/orderTypes';

const initial_state = {
    allOrders: [],
    orderDetail: {}
}

function orderReducer(state = initial_state, action) {
    
    switch (action.type) {
        case GET_ALL_ORDERS:
            return {
                ...state,
                allOrders: action.payload,
              }

        case GET_CANCEL_ORDERS:
            return {
                ...state,
                allOrders: action.payload
              }
        
        case GET_CLOSED_ORDERS:
            return {
                ...state,
                allOrders: action.payload
              }
        
        case GET_DISPATCHED_ORDERS:
            return {
                ...state,
                 allOrders: action.payload
             }

        case GET_ORDER_DETAIL:
            return {
                ...state,
                orderDetail: action.payload,
              }

        case GET_PENDING_ORDERS:
            return {
                ...state,
                allOrders: action.payload
              }


        case ORDER_STATE_CHANGE: 
        return {
            ...state,
            orderDetail: action.payload
        }
        
        default:
            return state;
    }        
    
}

export default orderReducer;