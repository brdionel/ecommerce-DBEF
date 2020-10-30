import swal from 'sweetalert'


export function getProducts() {
  return function (dispatch) {
    return fetch('http://localhost:3002/products', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((products) =>
        dispatch({
          type: 'GET_PRODUCTS',
          payload: products,
        })
      )
      .catch((error) => console.log(error))
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
          type: 'GET_PRODUCTS',
          payload: products.products,
        })
      })
  }
}

export function getProductsBySearch(searchProduct) {
  console.log('en gpbs: ' + searchProduct)
  return function (dispatch) {
    return fetch(`http://localhost:3002/products${searchProduct}`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((products) =>
        dispatch({
          type: 'GET_PRODUCTS',
          payload: products,
        })
      )
      .catch((err) => {
        swal('No hay productos para esa busqueda!')
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
          type: 'GET_PRODUCT_DETAIL',
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
          type: 'ADD_PRODUCT',
          payload: product,
        })
        swal('Producto creado con exito', '', 'success')
      })
  }
}

export function removeProduct(id) {
  console.log('llega el remove con el id: ' + id)
  return function (dispatch) {
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
        dispatch({
          type: 'REMOVE_PRODUCT',
          payload: product.id,
        })
        swal('Se elimino el producto correctamente', '', 'success')
      })
      .catch((err) => console.log(err))
  }
}

export function updateProduct(id, product) {
  return function (dispatch) {
    fetch(`http://localhost:3002/products/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((product) => {
        dispatch({
          type: 'UPDATE_PRODUCTS',
          payload: product,
        })
        swal('Se modifico el Producto', '', 'success')
      })
      .catch((err) => console.log(err))
  }
}

export function getCategories() {
  return function (dispatch) {
    return fetch('http://localhost:3002/category', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((category) =>
        dispatch({
          type: 'GET_CATEGORIES',
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
            type: 'ADD_CATEGORY',
            payload: response.category,
          })
          return response
        }
      })
      .catch((error) => {
        return {
          error: true,
          message:
            'Error durante la creacion de la catgoria. Intentar otra vez!',
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
          type: 'REMOVE_CATEGORY',
          payload: category.id,
        })
        swal('Categoria eliminada', '', 'success')
      })
      .catch((err) => console.log(err))
  }
}

export function getUsers() {
  return function (dispatch) {
    return fetch('http://localhost:3002/user', { credentials: 'include' })
      .then((res) => res.json())
      .then((users) =>
        dispatch({
          type: 'GET_USERS',
          payload: users,
        })
      )
  }
}

export function getUserDetail(id) {
  return function (dispatch) {
    return fetch(`http://localhost:3002/user/${id}`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((user) =>
        dispatch({
          type: 'GET_USER_DETAIL',
          payload: user,
        })
      )
  }
}

export function addUser(user) {
  return function (dispatch) {
    return fetch('http://localhost:3002/user', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(user),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((response) => {
        // el response que viene del back es un objeto con las propiedades:
        // - success, message y user (si fue creado)
        // - error, message (si no se creo)
        //aca meteria return response
        if (response.error) {
          return response
        } else {
          dispatch({
            type: 'ADD_USER',
            payload: response.user,
          })
          return response
        }
      })
      .catch((error) => {
        return {
          error: true,
          message: 'Error durante la creacion del usuario. Intentar otra vez!',
        }
      })
  }
}

export function removeUser(id) {
  return function (dispatch) {
    return fetch(`http://localhost:3002/user/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((user) => {
        dispatch({
          type: 'REMOVE_USER',
          payload: user.id,
        })
        swal('Cuenta de usuario eliminada', '', 'success')
      })
      .catch((err) => console.log(err))
  }
}

export function getProductsCart() {
  return function (dispatch) {
    return fetch(`http://localhost:3002/user/cart`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((order) => {
        order.error || order.length === 0
          ? dispatch({
              type: 'GET_PRODUCTS_IN_CART',
              payload: [],
            })
          : dispatch({
              type: 'GET_PRODUCTS_IN_CART',
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
          type: 'DELETE_PRODUCT_CART',
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
          type: 'UPDATE_COUNT_PRODUCT',
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
          type: 'ADD_PRODUCT_IN_CART',
          payload: data.products,
        })
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
            type: 'CLEAN_ORDER',
          })
        : swal('Error al cancelar la orden', '', 'error')
    )
  }
}

export function getClosedOrders() {
  return function (dispatch) {
    return fetch('http://localhost:3002/orders/admin?search=completa', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((closedOrders) =>
        dispatch({
          type: 'GET_CLOSED_ORDERS',
          payload: closedOrders,
        })
      )
  }
}

export function getPendingOrders() {
  return function (dispatch) {
    return fetch('http://localhost:3002/orders/admin?search=procesando', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((pendingOrders) =>
        dispatch({
          type: 'GET_PENDING_ORDERS',
          payload: pendingOrders,
        })
      )
  }
}

export function getCancelOrders() {
  return function (dispatch) {
    return fetch('http://localhost:3002/orders/admin?search=cancelada', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((cancelOrders) =>
        dispatch({
          type: 'GET_CANCEL_ORDERS',
          payload: cancelOrders,
        })
      )
  }
}

export function getDispatchedOrders() {
  return function (dispatch) {
    return fetch('http://localhost:3002/orders/admin?search=despachado', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((dispatchedOrders) =>
        dispatch({
          type: 'GET_DISPATCHED_ORDERS',
          payload: dispatchedOrders,
        })
      )
  }
}

export function getAllOrders() {
  return function (dispatch) {
    return fetch('http://localhost:3002/orders/admin?all=true', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((allOrders) =>
        dispatch({
          type: 'GET_ALL_ORDERS',
          payload: allOrders,
        })
      )
  }
}

export function promoteToAdmin(id) {
  return function (dispatch) {
    return fetch(`http://localhost:3002/admin/promote/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((user) => {
        dispatch({
          type: 'PROMOTE_TO_ADMIN',
          payload: user,
        })
        swal('Usuario Promovido a Admin', '', 'success')
      })
      .catch((err) => console.log(err))
  }
}

export function resetPassword(userId) {
  return function (dispatch) {
    return fetch(`http://localhost:3002/user/${userId}/passwordReset`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: 'RESET_PASSWORD',
          payload: data,
        })
      )
  }
}

export function userLogin(input) {
  return function (dispatch) {
    return fetch(`http://localhost:3002/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    })
      .then((res) => res.json())
      .then((response) => {
        dispatch({
          type: 'USER_LOGGED',
          payload: response.user,
        })
        return response
      })
      .catch((error) => {
        return { error: true, message: 'Error en login, intente otra vez' }
      })
  }
}

export function userChangePassword(input) {
  return function (dispatch) {
    return fetch(`http://localhost:3002/user/password`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: input }),
    })
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: 'USER_CHANGE_PASSWORD',
          payload: data,
        })
      )
  }
}

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
          type: 'ADD_REVIEWS',
          payload: review,
        })
        swal('Reseña agregada con exito', '', 'success')
      })
      .catch(() => {
        swal('Error!', 'Ingresar los datos ', 'error')
      })
  }
}

export function addProductCartGuest(prod) {
  return {
    type: 'ADD_PRODUCT_CART_GUEST',
    payload: prod,
  }
}

export function deleteProductCartGuest(id) {
  return {
    type: 'DELETE_PRODUCT_CART_GUEST',
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
        type: 'SET_PRODUCTS_USER',
      })
    })
  }
}

export function updateCountProductGuest(idProduct, count) {
  return {
    type: 'UPDATE_COUNT_PRODUCT_GUEST',
    payload: {
      id: idProduct,
      quantity: count,
    },
  }
}

export function getCartLS(carrito) {
  return function (dispatch) {
    dispatch({
      type: 'GET_CART_LS',
      payload: carrito,
    })
  }
}

export function addCartLocalS(carrito) {
  return function (dispatch) {
    dispatch({
      type: 'ADD_CART_LOCAL_S',
      payload: carrito,
    })
  }
}
export function updateCartLocalS(carrito) {
  return function (dispatch) {
    dispatch({
      type: 'UPDATE_CART_LOCAL_S',
      payload: carrito,
    })
  }
}
export function clearCartLocalS() {
  return function (dispatch) {
    dispatch({
      type: 'CLEAR_CART_LOCAL_S',
    })
  }
}
export function deleteProductLocalS(carrito) {
  return function (dispatch) {
    dispatch({
      type: 'DELETE_PRODUCT_LOCAL_S',
      payload: carrito,
    })
  }
}
export function updateUserLogged(user) {
  return function (dispatch) {
    return fetch(`http://localhost:3002/auth/me`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then((res) => {
      if (res.status === 400) {
        swal('No podes dejar campos vacíos')
      } else {
        dispatch({
          type: 'UPDATE_USER_LOGGED',
          payload: res.user,
        })
        swal('usuario modifidado', '', 'success')
      }
    })
  }
}

export function deleteUser() {
  return function (dispatch) {
    return fetch(`http://localhost:3002/auth/me`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      res.status === 200
        ? dispatch({
            type: 'DELETE_USER',
          })
        : swal('no se puede eliminar')
    })
  }
}
export function getUserLogged() {
  return function (dispatch) {
    return fetch(`http://localhost:3002/auth/me`, { credentials: 'include' })
      .then((response) => response.json())
      .then((user) => {
        dispatch({
          type: 'GET_USER_LOGGED',
          payload: user,
        })
      })
      .catch((err) => swal('usuario no encontrado'))
  }
}

export function orderStateChange(orderId, status) {
  return function (dispatch) {
    return fetch(`http://localhost:3002/orders/stateChange`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: orderId, state: status }),
    })
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: 'ORDER_STATE_CHANGE',
          payload: data,
        })
      )
  }
}

export function userLoginLS(user) {
  return {
    type: 'USER_LOGGED_LS',
    payload: user,
  }
}

export function userLogout() {
  return function (dispatch) {
    return fetch('http://localhost:3002/logout', {
      credentials: 'include',
    })
      .then((response) => {
        response.text()
      })
      .then((data) => {
        localStorage.setItem('userLogged', JSON.stringify(''))
        dispatch({
          type: 'USER_LOGOUT',
        })
        return {
          success: true,
          message: 'Usuario deslogueado',
        }
      })
      .catch((err) => {
        console.log('la respuesta en el catch es: ' + err)
        return {
          error: true,
          message: 'Error al desloguearse',
        }
      })
  }
}

export function getClosedOrdersByUser() {
  return function (dispatch) {

    return fetch('http://localhost:3002/orders/user/me', {

      credentials: 'include',
    })
      .then((res) => res.json())
      .then((closedOrders) => {
        if (closedOrders.error) {
          return closedOrders
        } else {
          dispatch({
            type: 'GET_CLOSED_ORDERS',
            payload: closedOrders,
          })
          return closedOrders
        }
      })
      .catch((err) => console.log('error al buscar ordenes'))
  }
}
