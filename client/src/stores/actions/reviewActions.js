import { ADD_REVIEWS } from '../types/reviewTypes'

export function addReviews(id, comments, userId, score) {
    return function (dispatch) {
      return fetch(`http://localhost:3002/products/${id}/review`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ comments, userId, score }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((review) => {
          dispatch({
            type: ADD_REVIEWS,
            payload: review,
          })
          console.log('Reseña agregada con exito', '', 'success')
        })
        .catch(() => {
          console.log('Error!', 'Ingresar los datos ', 'error')
        })
    }
  }