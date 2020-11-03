import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { userLogin } from '../../stores/actions/userActions'
import swal from 'sweetalert'
import styles from './LoginForm.module.scss' 

function LoginForm({ userLogin, user, setProductsUser, cartGuest }) {
  const history = useHistory()
  const [input, setInput] = useState({
    username: '',
    password: '',
  })

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = function (e) {
    e.preventDefault()
    userLogin(input)
      .then((res) => {
        if (res.success) {
          localStorage.setItem('userLogged', JSON.stringify(res.user))
          res.user.resetPassword
            ? history.replace('/user/resetPassword')
            : history.replace('/')
        } else if (res.error) {
          swal(res.message, '', 'error')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <form onSubmit={handleSubmit} className= {`${styles.wrapperLogin} mx-auto`}>
      <h2 className= 'text-center mb-3'>Ingresa tu e-mail y contraseña</h2>
      <br/>
      <div className= 'mb-3'>
        <label>Email </label>
        <input
          className={`form-control p-4`}
          type='text'
          name='username'
          onChange={handleInputChange}
          value={input.email}
        />
      </div>
      <div className= 'mb-4'>
        <label>Contraseña </label>
        <input
          className={`form-control p-4`}
          type='password'
          name='password'
          onChange={handleInputChange}
          value={input.password}
        />
      </div>
      <div className= 'mb-3'>
        <input 
          type='submit' 
          value='Ingresar' 
          className={`${styles.textForm} btn btn-primary btn-lg btn-block py-3` }
        />
      </div>
      <Link to='/user/createUser'>
        <button className={`${styles.textForm} btn btn-link btn-lg btn-block py-3` }>
          Crear Cuenta 
        </button>
      </Link>
    </form>
  )
}

const mapStateToProps = (state) => {
  const { userReducer } = state;
  
  return {
    user: userReducer.userLogged,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (input) => dispatch(userLogin(input)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)