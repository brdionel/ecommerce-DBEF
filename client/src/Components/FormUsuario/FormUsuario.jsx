import React, { useState, useEffect } from 'react'
import '../StyleForm.css'
import { connect } from 'react-redux'
import {
  addUser,
  deleteUser,
  updateUserLogged,
  userLogout,
} from '../../stores/actions/userActions'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import styles from './FormUsuario.module.scss'

function FormUsuario({
  updateUserLogged,
  user,
  addUser,
  deleteUser,
  userLogout,
}) {
  const history = useHistory()
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
  }

  const [input, setInput] = useState(initialState)

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
  })

  useEffect(() => {
    if (user) {
      setInput({
        ...input,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      })
    }
  }, [])

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    )
  }

  const validate = function (input) {
    let errors = {}

    if (!input.firstName) {
      errors.firstName = 'Nombre requerido'
    }

    if (!input.lastName) {
      errors.lastName = 'Apellido requerido'
    }

    if (!input.email) {
      errors.email = 'e-mail requerido'
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
      errors.email = 'e-mail no válido'
    }

    if (!input.password) {
      errors.password = 'Contraseña requerida'
    } else if (input.password.trim().length < 8) {
      errors.password = 'Al menos 8 caracteres'
    } else if (
      !/^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/.test(input.password)
    ) {
      errors.password = 'Al menos una mayúscula, una minúscula y un dígito'
    }

    if (!input.confirm) {
      errors.confirm = 'Repita la contraseña'
    } else if (input.password !== input.confirm) {
      errors.confirm = 'No coincide con la contraseña'
    }

    return errors
  }

  const resetForm = () => {
    setInput({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirm: '',
    })
  }

  const handleSubmit = function (e) {
    e.preventDefault()
    const userN = {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      password: input.password,
    }
    user ? updateUserLogged(userN) : createUser(userN)
    history.push('/')
  }

  const createUser = function (user) {
    addUser(user)
      .then((response) => {
        if (response.success) {
          swal(response.message, '', 'success')
          resetForm()
        } else {
          swal(response.message, '', 'error')
        }
      })
      .catch((error) => {
        swal(error.message, '', 'error')
      })
  }

  console.log('styles'+ styles)

  return (
    <div className={styles.wrapperForm}>
      {user ? <h3> Modificar Usuario</h3> : <h3>Completa tus datos</h3>}
      <form onSubmit={handleSubmit}>
        <hr />
        <div className='form-row'>
          <div className='col-md-6 mb-3'>
            <label>Nombre: </label>
            <input
              className={`form-control p-4`}
              type='text'
              name='firstName'
              onChange={handleInputChange}
              value={input.firstName}
            />
            {errors.firstName && (
              <span className='error text-danger'>
                <small>{errors.firstName}</small>
              </span>
            )}
          </div>
          <div className='col-md-6 mb-3'>
            <label>Apellido: </label>
            <input
              className={`form-control p-4`}
              type='text'
              name='lastName'
              onChange={handleInputChange}
              value={input.lastName}
            />
            {errors.lastName && (
              <span className='error text-danger'>
                <small>{errors.lastName}</small>
              </span>
            )}
          </div>
          <div className='col-md-12 mb-3'>
            <label>Correo electronico: </label>
            <input
              className={`form-control p-4`}
              placeholder='nombre@email.com'
              type='text'
              name='email'
              onChange={handleInputChange}
              value={input.email}
            />
            {errors.email && (
              <span className='erros text-danger'>
                <small>{errors.email}</small>
              </span>
            )}
          </div>
        </div>
        {user ? null : (
          <div className='form-row'>
            <div className='col-md-6 mb-3'>
              <label>Contraseña: </label>
              <input
                className={`form-control p-4`}
                type='password'
                name='password'
                onChange={handleInputChange}
                value={input.password}
              />
              {errors.password && (
                <span className='error text-danger'>
                  <small>{errors.password}</small>
                </span>
              )}
            </div>
            <div className='col-md-6 mb-3'>
              <label>Repetir contraeña: </label>
              <input
                className={`form-control p-4`}
                type='password'
                name='confirm'
                onChange={handleInputChange}
                value={input.confirm}
              />
              {errors.confirm && (
                <span className='error text-danger'>
                  <small>{errors.confirm}</small>
                </span>
              )}
            </div>
          </div>
        )}
        <div className='modal-footer'>
          {!user ? (
            <input
              type='submit'
              value='Crear cuenta'
              className={`${styles.textForm} btn btn-primary  btn-lg py-3` }
              disabled={
                !errors.name &&
                !errors.lastName &&
                !errors.email &&
                !errors.password &&
                !errors.confirm &&
                input.firstName &&
                input.lastName &&
                input.email &&
                input.password &&
                input.confirm
                  ? false
                  : true
              }
            />
          ) : (
            <input
              type='submit'
              value='Modificar'
              className='btn btn-primary'
            />
          )}
        </div>
      </form>
      {user ? (
        <div>
          <hr />
          <div>
            {' '}
            <Link to='/user/login'>
              <button
                onClick={() => userLogout()}
                type='button'
                className='btn btn-outline-info mt-4 '
              >
                {'  '} Cerrar sesion{'  '}
              </button>
            </Link>
          </div>

          <div id='closeIcon' className='row'>
            <button
              onClick={() => {
                swal({
                  title: 'Eliminar',
                  text: 'Seguro desea eliminar el producto?',
                  icon: 'warning',
                  buttons: ['No', 'Si'],
                  dangerMode: true,
                }).then((res) => {
                  if (res) {
                    deleteUser()
                    history.replace('/')
                  } else {
                    return null
                  }
                })
              }}
              className='btn btn-outline-danger mt-2'
            >
              Eliminar mi cuenta
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
const mapStateToProps = (state) => {
  const { userReducer } = state;
  return {
    users: userReducer.users,
    user: userReducer.userLogged,
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => dispatch(addUser(user)),
    deleteUser: () => dispatch(deleteUser()),
    updateUserLogged: (user) => dispatch(updateUserLogged(user)),
    userLogout: () => dispatch(userLogout()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FormUsuario)