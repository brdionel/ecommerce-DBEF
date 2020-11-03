import { ADD_REVIEWS } from '../types/reviewTypes'

const initial_state = {
    reviews: []
}

function reviewReducer ( state = initial_state, action) {
    switch (action.type) {
        case ADD_REVIEWS:
      return {
        ...state,
        reviews: state.reviews.concat(action.payload),
      }

        default:
            return state;
    }
}

export default reviewReducer;




