import { ADD_CATEGORY, GET_CATEGORIES, REMOVE_CATEGORY, GET_CATEGORY_DETAIL } from '../types/categoryTypes'

const initial_state = {
    categories: [],
    categoryDetail: {}
}

function categoryReducer(state = initial_state, action) {
    
    switch (action.type) {
        case ADD_CATEGORY:
            return {
                ...state,
                categories: state.categories.concat(action.payload),
            }

        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            }
        
        case REMOVE_CATEGORY:
            return {
                ...state,
                categories: state.categories.filter(
                  (category) => category.id != action.payload
                )
            }
        
        case GET_CATEGORY_DETAIL:
            return {
            ...state,
            categoryDetail: action.payload,
        }
        
        default:
            return state;
    }        
    
}

export default categoryReducer;