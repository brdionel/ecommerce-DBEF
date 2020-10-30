import React from 'react';
import { Link } from 'react-router-dom'
import "../StyleForm.css";
import {getUsers, getClosedOrders} from '../../actions'
import { connect } from "react-redux";

export function Admin( {getClosedOrders, getUsers} ){
	return (
		<div className="formStyle" >
			 <h5>Productos</h5>
            <hr/>
			<Link to='/admin/createProduct'>
				<button type="button" className="btn btn-outline-info mr-2">Crear Producto</button>
			</Link>
			<h5 className="mt-5">Categorias</h5>
			<hr/>
			<Link to='/admin/createCategory'>
				<button type="button" className="btn btn-outline-info">Crear Categorias </button>
			</Link>
			<h5 className="mt-5">Ordenes</h5>
			<hr/>
			<Link to='/admin/closedOrders'>
				<button type="button" className="btn btn-outline-info mr-2" onClick={getClosedOrders}>Ver Ordenes </button>
			</Link>
			<h5 className="mt-5">Usuarios</h5>
			<hr/>
			<Link to='/admin/usersList'>
				<button type="button" className="btn btn-outline-info mr-2" onClick={getUsers}>Ver Usuarios </button>
			</Link>
		</div>	
	)	
}

const mapDispatchToProps = (dispatch) => {
	return {
		getClosedOrders : () => dispatch(getClosedOrders()),
		getUsers: () => dispatch(getUsers())
	}
}

export default connect(null, mapDispatchToProps)(Admin)
