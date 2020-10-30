const initialstate = {
  products: [],
  categories: [],
  productDetail: {},
  categoryDetail: {},
  users: [],
  userDetail: {},
  cart: [],
  cartGuest: [],
  allOrders: [],
  orderDetail: {},
  userLogged: '',
  reviews: [],
}

export default function rootReducer(state = initialstate, action) {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
      }

    case 'GET_PRODUCT_DETAIL':
      return {
        ...state,
        productDetail: action.payload,
      }

    case 'ADD_PRODUCT':
      return {
        ...state,
        products: state.products.concat(action.payload),
      }

    case 'REMOVE_PRODUCT':
      return {
        ...state,
        producs: state.products.filter(
          (product) => product.id != action.payload
        ),
      }

    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: state.categories.concat(action.payload),
      }

    case 'GET_CATEGORY_DETAIL':
      return {
        ...state,
        categoryDetail: action.payload,
      }

    case 'GET_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
      }

    case 'REMOVE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id != action.payload
        ),
      }

    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
      }

    case 'GET_USER_DETAIL':
      return {
        ...state,
        userDetail: action.payload,
      }

    case 'ADD_USER':
      return {
        ...state,
        users: state.users.concat(action.payload),
      }
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user.id != action.payload),
      }
    case 'GET_PRODUCTS_IN_CART':
      return {
        ...state,
        cart: action.payload,
      }

    case 'DELETE_PRODUCT_CART':
      return {
        ...state,
        cart: state.cart.filter((product) => product.id !== action.payload),
      }

    case 'UPDATE_COUNT_PRODUCT':
      return {
        ...state,
        cart: action.payload,
      }

    case 'ADD_PRODUCT_IN_CART':
      return {
        ...state,
        cart: action.payload,
      }

    case 'CLEAN_ORDER':
      return {
        ...state,
        cart: [],
      }
    case 'GET_PENDING_ORDERS':
      return {
        ...state,
        allOrders: action.payload
      }
    case 'GET_ALL_ORDERS':
      return {
        ...state,
        allOrders: action.payload,
      }
    case 'GET_CANCEL_ORDERS':
      return {
        ...state,
        allOrders: action.payload
      }
    case 'GET_CLOSED_ORDERS':
      return {
        ...state,
        allOrders: action.payload
      }

    case 'GET_DISPATCHED_ORDERS':
      return {
        ...state,
         allOrders: action.payload
     }
    
    case 'GET_ORDER_DETAIL':
      return {
        ...state,
        orderDetail: action.payload,
      }

    case 'PROMOTE_TO_ADMIN':
      return {
        ...state,
        userDetail: action.payload,
      }
    case 'RESET_PASSWORD':
      return {
        ...state,
        users: action.payload,
      }
    case 'USER_LOGGED':
      return {
        ...state,
        userLogged: action.payload,
      }
    case 'USER_LOGOUT':
      return {
        ...state,
        userLogged: '',
        cart: [],
      }
    case 'USER_CHANGE_PASSWORD':
      return {
        ...state,
        userLogged: action.payload,
      }
    case 'ADD_REVIEWS':
      return {
        ...state,
        reviews: state.reviews.concat(action.payload),
      }
    case 'ADD_PRODUCT_CART_GUEST':
      return {
        ...state,
        cartGuest: action.payload,
      }
    case 'DELETE_PRODUCT_CART_GUEST':
      return {
        ...state,
        cartGuest: state.cartGuest.filter((prod) => prod.id !== action.payload),
      }

    case 'GET_CART_LS':
      return {
        ...state,
        cartGuest: action.payload,
      }
    case 'UPDATE_CART_LOCAL_S':
      return {
        ...state,
        cartGuest: action.payload,
      }
    case 'CLEAR_CART_LOCAL_S':
      return {
        ...state,
        cartGuest: [],
      }

    case 'SET_PRODUCTS_USER':
      return {
        ...state,
        cartGuest: [],
      }
    case 'UPDATE_COUNT_PRODUCT_GUEST':
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
    case 'GET_USER_LOGGED':
      return {
        ...state,
        userLogged: action.payload
      }
    case 'DELETE_USER': 
    return {
      ...state,
      userLogged: ""
    }
    case 'UPDATE_USER_LOGGED': 
    return {
      ...state,
      userLogged: action.payload
    }
    case "ORDER_STATE_CHANGE":
			return {
				...state,
				orderDetail: action.payload
      }
    case "ORDER_STATE_CHANGE":
      return {
        ...state,
        orderDetail: action.payload
      }  
      
    case 'USER_LOGGED_LS':
      return {
        ...state,
        userLogged: action.payload
      }
      
    default:
      return state
  }
}

