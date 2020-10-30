import React from 'react'
import NavBar from '../../Components/NavBar';
import LoginForm from '../../Components/LoginForm'

function Login() {

  return (
    <div>
      <NavBar 
        barExtend = {true}
        navSoloBrand = {true}
      />
      <LoginForm />
    </div>
  )
}

export default Login;