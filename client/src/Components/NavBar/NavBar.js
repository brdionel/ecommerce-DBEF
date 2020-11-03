import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'
// import { userLogout, getClosedOrdersByUser } from '../../actions'
import { userLogout } from '../../stores/actions/userActions'
import { getClosedOrdersByUser } from '../../stores/actions/orderActions'
import styles from './NavBar.module.scss';

function NavBar({ user, userLogout, navSoloBrand, barExtend }) {

  const cerrarSesion = function () {
    userLogout()
    .then(response => {
      if (response.error) {
        console.log(
          'response en userlogout seria: ' + JSON.stringify(response.message)
        )
      } else {
        console.log('se desloguea con exito')
        localStorage.setItem('userLogged', JSON.stringify(''))
      }
    })
    .catch((err) => {
      console.log(JSON.stringify(err))
    })
  }

  const handleClickCompras = function () {
    getClosedOrdersByUser(user.id)
  }

  return (
    <nav className={`py-3 ${barExtend && styles.barExtend} navbar navbar-dark bg-dark`}>
      <Link to='/'>
        <h1 className='text-white text-uppercase font-weight-light'>
          <FontAwesomeIcon icon={['fas', 'mouse']} /> Dbef 
        </h1>
      </Link>
      { !navSoloBrand && <SearchBar /> }
      { navSoloBrand? '':
        <div className='d-flex justify-content-center align-items-center'>
        {user && user.isAdmin ? (
          <Link to='/principal/admin'>
            <button className={`btn ${styles.iconStyle}`}>
              {' '} <FontAwesomeIcon icon={['fas', 'tools']} /> Admin
            </button>
          </Link>
        ) : null}
        {!user ? (
          <Link to='/user/login'>
            <button className={`btn ${styles.iconStyle}`}>
              {' '}<FontAwesomeIcon icon={['fas', 'user']} /> Iniciar sesion
            </button>
          </Link>
        ) : (
          <div className='nav-item dropdown d-inline'>
            <a
              className={`nav-link dropdown-toggle ${styles.iconStyle} btn`}
              href='/'
              id='navbarDropdown'
              role='button'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              <FontAwesomeIcon icon={['fas', 'user']} className='mr-2' />
              {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}
            </a>
            <div className='dropdown-menu' aria-labelledby='navbarDropdown'>
              <Link to='/auth/me'>
                <button className='dropdown-item'>Mi perfil</button>
              </Link>

              <Link to={`/user/compras`}>
                <button
                  onClick={handleClickCompras}
                  className='dropdown-item'
                >
                  Mis Compras
                </button>
              </Link>

              <div className='dropdown-divider'></div>
              <Link to='/user/login'>
                <button
                  onClick={cerrarSesion}
                  className='dropdown-item bg-danger text-white'
                >
                  <FontAwesomeIcon icon={['fas', 'sign-out-alt']} /> Salir
                </button>
              </Link>
            </div>
          </div>
        )}

        <Link to='/admin/cart'>
          <button
            className={`btn ${styles.iconStyle}`}
          >
            {' '}
            <FontAwesomeIcon icon={['fas', 'shopping-cart']} /> Carrito
          </button>
        </Link>
        {!user ? (
          <Link to='/user/createUser'>
            <button type='button' className='btn btn-outline-info'>
              Registrarse
            </button>
          </Link>
        ) : null}
      </div>
      }
    </nav>
  )
}
const mapStateToProps = (state) => {
  const { userReducer } = state
  
  return {
    user: userReducer.userLogged,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLogout: () => dispatch(userLogout()),
    getClosedOrdersByUser: () => dispatch(getClosedOrdersByUser()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)