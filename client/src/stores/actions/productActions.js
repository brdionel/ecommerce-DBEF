import { ADD_PRODUCT, GET_PRODUCT_DETAIL, REMOVE_PRODUCT, GET_PRODUCTS } from '../types/productTypes';
import { CARGANDO, YA_CARGADO } from '../types/generalTypes';

export function getProducts() {
    return function (dispatch) {
      dispatch({
        type: CARGANDO
      })
      return fetch('http://localhost:3002/products', {
            credentials: 'include',
        })
        .then((res) => res.json())
        .then((products) => {
          console.log('la rta del product es:'+ JSON.stringify(products))
          dispatch({
            type: YA_CARGADO
          }) 
          
          dispatch({
            type: GET_PRODUCTS,
            payload: products,
          })
        }
        )
        .catch((error) => {
          console.log(error)
          // dispatch({
          //   type: ERROR,
          //   payload: error.message
          // })
        })
    }
}

export function getProductsByCategory(nameCategory) {
    return function (dispatch) {
      return fetch(`http://localhost:3002/category/${nameCategory}`, {
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((products) => {
          dispatch({
            type: GET_PRODUCTS,
            payload: products.products,
          })
        })
    }
}

export function getProductsBySearch(searchProduct) {
    return function (dispatch) {
      return fetch(`http://localhost:3002/products${searchProduct}`, {
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((products) =>
          dispatch({
            type: GET_PRODUCTS,
            payload: products,
          })
        )
        .catch((err) => {
          console.log('No hay productos para esa busqueda!')
        })
    }
}

export function getProductDetail(id) {
    return function (dispatch) {
        return fetch(`http://localhost:3002/products/${id}`, {
            credentials: 'include',
        })
        .then((response) => response.json())
        .then((product) =>
          dispatch({
            type: GET_PRODUCT_DETAIL,
            payload: product,
          })
        )
        .catch((err) => {
          return { error: true }
        })
    }
}

export function addProduct(product) {
    return function (dispatch) {
        return fetch('http://localhost:3002/products', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(product),
            headers: {
                Accept: 'application/json',
            'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((product) => {
          dispatch({
            type: ADD_PRODUCT,
            payload: product,
          })
          console.log('Producto creado con exito', '', 'success')
        })
    }
}
  
export function removeProduct(id) {
  return function (dispatch) {
    dispatch({
      type: REMOVE_PRODUCT,
      payload: id,
    })
      fetch(`http://localhost:3002/products/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json())
      .then((product) => {
          
          console.log('Se elimino el producto correctamente', '', 'success')
      })
      .catch((err) => console.log(err))
  }
}