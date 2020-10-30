import React from 'react';
import NavBar from '../../Components/NavBar'
import FormUsuario from '../../Components/FormUsuario'

function User({navSoloBrand}) {

    return(
        <div>
            <NavBar navSoloBrand= { navSoloBrand }/>
            <FormUsuario />
        </div>
    )
}

export default User;