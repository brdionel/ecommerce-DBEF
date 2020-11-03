import { ADD_PRODUCT_IN_CART, DELETE_PRODUCT_CART, GET_PRODUCTS_IN_CART, 
    UPDATE_COUNT_PRODUCT, ADD_PRODUCT_CART_GUEST, CLEAR_CART_LOCAL_S, DELETE_PRODUCT_CART_GUEST,
    GET_CART_LS, SET_PRODUCTS_USER, UPDATE_CART_LOCAL_S, UPDATE_COUNT_PRODUCT_GUEST, CLEAN_ORDER} 
    from '../types/cartTypes';

const initial_state = {
    cart: [],
    cartGuest: []
}
    
function cartReducer(state = initial_state, action) {
        
        switch (action.type) {
            case ADD_PRODUCT_IN_CART:
                return {
                    ...state,
                    cart: action.payload,
                }
    
            case DELETE_PRODUCT_CART:
                return {
                    ...state,
                    cart: state.cart.filter((product) => product.id !== action.payload),
                  }
            
            case GET_PRODUCTS_IN_CART:
                return {
                    ...state,
                    cart: action.payload,
                }
            
            case UPDATE_COUNT_PRODUCT:
                case 'UPDATE_COUNT_PRODUCT':
                    return {
                      ...state,
                      cart: action.payload,
                    }

            case ADD_PRODUCT_CART_GUEST:
                return {
                    ...state,
                    cartGuest: action.payload,
                  }

            case CLEAR_CART_LOCAL_S:
                return {
                    ...state,
                    cartGuest: [],
                  }

            case DELETE_PRODUCT_CART_GUEST:
                return {
                    ...state,
                    cartGuest: state.cartGuest.filter((prod) => prod.id !== action.payload),
                  }

            case GET_CART_LS:
                return {
                    ...state,
                    cartGuest: action.payload,
                  }


            case SET_PRODUCTS_USER: 
            return {
                ...state,
                cartGuest: [],
              }

            case UPDATE_COUNT_PRODUCT_GUEST:
                return {
                    ...state,
                    cartGuest: state.cartGuest.map((prod) => {
                      if (prod.id === action.payload.id) {
                        prod.quantity = action.payload.quantity
                        return prod
                      } else {
                        return prod
                      }
                    }),
                  }

            case UPDATE_CART_LOCAL_S: 
            return {
                ...state,
                cartGuest: action.payload,
              }
                
              case CLEAN_ORDER:
                return {
                  ...state,
                  cart: [],
                }
            
            default:
                return state;
        }        
        
    }
    
export default cartReducer;