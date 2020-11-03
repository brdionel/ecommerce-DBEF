import { ADD_PRODUCT_IN_CART, DELETE_PRODUCT_CART, GET_PRODUCTS_IN_CART, 
    UPDATE_COUNT_PRODUCT, ADD_PRODUCT_CART_GUEST, CLEAR_CART_LOCAL_S, DELETE_PRODUCT_CART_GUEST,
    GET_CART_LS, SET_PRODUCTS_USER, UPDATE_CART_LOCAL_S, UPDATE_COUNT_PRODUCT_GUEST, ADD_CART_LOCAL_S, 
    CLEAN_ORDER, DELETE_PRODUCT_LOCAL_S} from '../types/cartTypes';

    
    export function getProductsCart() {
        return function (dispatch) {
          return fetch(`http://localhost:3002/user/cart`, {
            credentials: 'include',
          })
            .then((res) => res.json())
            .then((order) => {
              order.error || order.length === 0
                ? dispatch({
                    type: GET_PRODUCTS_IN_CART,
                    payload: [],
                  })
                : dispatch({
                    type: GET_PRODUCTS_IN_CART,
                    payload: order[0].products,
                  })
            })
        }
      }

      export function deleteProductInCart(idProduct) {
        return function (dispatch) {
          return fetch(`http://localhost:3002/user/cart`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId: idProduct }),
          })
            .then((res) => res.json())
            .then((product) => {
              dispatch({
                type: DELETE_PRODUCT_CART,
                payload: product.productId,
              })
            })
        }
      }

      export function updateCountProductInCart(idProduct, count) {
        return function (dispatch) {
          return fetch(`http://localhost:3002/user/cart`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId: idProduct, quantity: count }),
          })
            .then((res) => res.json())
            .then((data) => {
              dispatch({
                type: UPDATE_COUNT_PRODUCT,
                payload: data.products,
              })
            })
            .catch(console.log)
        }
      }

      export function addProductCart(idProduct, priceProduct) {
        return function (dispatch) {
          return fetch(`http://localhost:3002/user/cart`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              products: [{ productId: idProduct, price: priceProduct }],
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data, '******')
              dispatch({
                type: ADD_PRODUCT_IN_CART,
                payload: data.products,
              })
            })
        }
      }
      export function addProductCartGuest(prod) {
        return {
          type: ADD_PRODUCT_CART_GUEST,
          payload: prod,
        }
      }

      export function deleteProductCartGuest(id) {
        return {
          type: DELETE_PRODUCT_CART_GUEST,
          payload: id,
        }
      }

      export function setProductsUser(prod) {
        let setProducts = prod.map((product) => {
          return {
            productId: product.id,
            price: product.price,
            quantity: product.quantity,
          }
        })
      
        return function (dispatch) {
          return fetch('http://localhost:3002/user/cart', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ products: setProducts }),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }).then((res) => {
            localStorage.setItem('carrito', JSON.stringify([]))
            dispatch({
              type: SET_PRODUCTS_USER,
            })
          })
        }
      }
      
      export function updateCountProductGuest(idProduct, count) {
        return {
          type: UPDATE_COUNT_PRODUCT_GUEST,
          payload: {
            id: idProduct,
            quantity: count,
          },
        }
      }
      
      export function getCartLS(carrito) {
        return function (dispatch) {
          dispatch({
            type: GET_CART_LS,
            payload: carrito,
          })
        }
      }
      
      export function addCartLocalS(carrito) {
        return function (dispatch) {
          dispatch({
            type: ADD_CART_LOCAL_S,
            payload: carrito,
          })
        }
      }
      export function updateCartLocalS(carrito) {
        return function (dispatch) {
          dispatch({
            type: UPDATE_CART_LOCAL_S,
            payload: carrito,
          })
        }
      }
      export function clearCartLocalS() {
        return function (dispatch) {
          dispatch({
            type: CLEAR_CART_LOCAL_S,
          })
        }
      }
      export function deleteProductLocalS(carrito) {
        return function (dispatch) {
          dispatch({
            type: DELETE_PRODUCT_LOCAL_S,
            payload: carrito,
          })
        }
      }

      export function cleanOrder() {
        return function (dispatch) {
          return fetch(`http://localhost:3002/user/cart`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }).then((res) =>
            res.status === 200
              ? dispatch({
                  type: CLEAN_ORDER,
                })
              : console.log('Error al cancelar la orden', '', 'error')
          )
        }
      }