import { ADD_PRODUCT, GET_PRODUCTS, REMOVE_PRODUCT, GET_PRODUCT_DETAIL} from '../types/productTypes'

const initial_state = {
    products: [],
    productDetail: {},
    isLoading: false
}

function productreducer ( state = initial_state, action) {
    switch (action.type) {
        case ADD_PRODUCT:
            return {
                ...state,
                products: state.products.concat(action.payload),
            }
            
        case GET_PRODUCTS:
            console.log(action.payload)
            return {
                ...state,
                products: action.payload,
                isLoading: false
            }
           
        
        case REMOVE_PRODUCT:
            return {
                ...state,
                producs: state.products.filter(
                  (product) => product.id != action.payload
                ),
            }
           
        case GET_PRODUCT_DETAIL:
            return {
                ...state,
                productDetail: action.payload,
            }

        default:
            return state;
    }
}

export default productreducer;