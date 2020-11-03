import { ADD_CATEGORY, GET_CATEGORY_DETAIL, REMOVE_CATEGORY, GET_CATEGORIES } from '../types/categoryTypes';

export function getCategories() {
    return function (dispatch) {
        return fetch('http://localhost:3002/category', {
            credentials: 'include',
        })
        .then((res) => res.json())
        .then((category) =>
            dispatch({
                type: GET_CATEGORIES,
                payload: category,
            })
        )
    }
}
  
export function addCategory(category) {
    return function (dispatch) {
        return fetch('http://localhost:3002/category', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(category),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((response) => {
            if (response.error) {
                return response
            } else {
                dispatch({
                    type: ADD_CATEGORY,
                    payload: response.category,
                })
                return response
            }
        })
        .catch((error) => {
            return {
                error: true,
                message: 'Error durante la creacion de la catgoria. Intentar otra vez!',
            }
        })
    }
}
  
export function removeCategory(id) {
    return function (dispatch) {
        return fetch(`http://localhost:3002/category/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((category) => {
            dispatch({
                type: REMOVE_CATEGORY,
                payload: category.id,
            })
            console.log('Categoria eliminada', '', 'success')
        })
        .catch((err) => console.log(err))
    }
}