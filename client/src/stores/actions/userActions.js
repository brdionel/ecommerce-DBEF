import { GET_USERS, GET_USER_DETAIL, ADD_USER, REMOVE_USER, USER_CHANGE_PASSWORD, USER_LOGGED_LS,
USER_LOGGED, RESET_PASSWORD, UPDATE_USER_LOGGED, DELETE_USER, PROMOTE_TO_ADMIN, GET_USER_LOGGED,
USER_LOGOUT } from '../types/userTypes';

export function getUsers() {
    return function (dispatch) {
      return fetch('http://localhost:3002/user', { credentials: 'include' })
        .then((res) => res.json())
        .then((users) =>
          dispatch({
            type: GET_USERS,
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
            type: GET_USER_DETAIL,
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
              type: ADD_USER,
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
            type: REMOVE_USER,
            payload: user.id,
          })
          console.log('Cuenta de usuario eliminada', '', 'success')
        })
        .catch((err) => console.log(err))
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
            type: PROMOTE_TO_ADMIN,
            payload: user,
          })
          console.log('Usuario Promovido a Admin', '', 'success')
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
            type: RESET_PASSWORD,
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
            type: USER_LOGGED,
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
            type: USER_CHANGE_PASSWORD,
            payload: data,
          })
        )
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
          console.log('No podes dejar campos vacíos')
        } else {
          dispatch({
            type: UPDATE_USER_LOGGED,
            payload: res.user,
          })
          console.log('usuario modifidado', '', 'success')
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
              type: DELETE_USER,
            })
          : console.log('no se puede eliminar')
      })
    }
  }

  export function getUserLogged() {
    return function (dispatch) {
      return fetch(`http://localhost:3002/auth/me`, { credentials: 'include' })
        .then((response) => response.json())
        .then((user) => {
          dispatch({
            type: GET_USER_LOGGED,
            payload: user,
          })
        })
        .catch((err) => console.log('usuario no encontrado'))
    }
  }

  export function userLoginLS(user) {
    return {
      type: USER_LOGGED_LS,
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
            type: USER_LOGOUT,
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