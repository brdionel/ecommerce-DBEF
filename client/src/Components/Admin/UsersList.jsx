import React from 'react'
// import { removeUser, promoteToAdmin, resetPassword } from '../../actions'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import swal from 'sweetalert'
import { useHistory } from 'react-router-dom'
import { removeUser, promoteToAdmin, resetPassword } from '../../stores/actions/userActions'

export function UsersList({users,removeUser,promoteToAdmin,resetPassword,userLogged}) {

	const history = useHistory()
	
	return (
		<div>
		{ userLogged.isAdmin ?
		<div className='container'>
			<div className='text-center'>
				<h4> Lista de Usuarios </h4>{' '}
			</div>
			<table className='table table-hover table-bordered'>
				<thead>
					<tr>
						<th scope='col'>ID</th>
						<th scope='col'>Usuario</th>
						<th scope='col'>E-mail</th>
					</tr>
				</thead>
				<tbody>
					{users.map((u) => (
						<tr key={u.id}>
							<th scope='row'> {u.id}</th>
							<td>
								{' '}
								{u.firstName} {u.lastName}{' '}
							</td>
							<td> {u.email} </td>
							<td>
								{!u.isAdmin ? (
									<button
										onClick={() => {
											swal({
												title: 'Promover',
												text:
													'¿Seguro desea Promover este usuario a Admin?',
												icon: 'warning',
												buttons: ['No', 'Si'],
												dangerMode: true,
											}).then((res) =>
												res
													? promoteToAdmin(u.id)
													: null
											)
										}}
										type='button'
										className='btn btn-outline-info ml-2'
									>
										{' '}
										Promover a Admin
									</button>
								) : (
									<FontAwesomeIcon
										icon={['fas', 'user-shield']}
									/>
								)}
								{!u.isAdmin ? (
									<button
										onClick={() => {
											swal({
												title: 'Resetear Contraseña',
												text:
													'¿Seguro desea resetear la contraseña del usuario?',
												icon: 'warning',
												buttons: ['No', 'Si'],
												dangerMode: true,
											})
												.then((res) =>
													res
														? resetPassword(u.id)
														: null
												)
												.then((res) =>
													res
														? swal({
																title: 'Exito',
																text:
																	'La operación se realizo con éxito',
																icon: 'success',
														  })
														: null
												)
												.catch((err) =>
													swal({
														title: 'Error',
														text:
															'Hubo un error al realizar la operacion',
														icon: 'error',
													})
												)
										}}
										type='button'
										className='btn btn-outline-info ml-2'
									>
										{' '}
										Resetear Contraseña
									</button>
								) : null}
								{!u.isAdmin ? (
									<button
										onClick={() => {
											swal({
												title: 'Eliminar',
												text:
													'¿Seguro desea eliminar este usuario?',
												icon: 'warning',
												buttons: ['No', 'Si'],
												dangerMode: true,
											}).then((res) =>
												res ? removeUser(u.id) : null
											)
										}}
										type='button'
										className=' btn btn-outline-info ml-4'
									>
										<FontAwesomeIcon
											icon={['fas', 'trash-alt']}
										/>
									</button>
								) : null}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
		: history.push('/') }
		</div>
	)
}

const mapStateToProps = (state) => {
	const { userReducer } = state;

	return{
		users: userReducer.users,
		userDetail: userReducer.userDetail,
		userLogged : userReducer.userLogged
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		removeUser: (id) => dispatch(removeUser(id)),
		promoteToAdmin: (id) => dispatch(promoteToAdmin( id)),
		resetPassword: (id) => dispatch(resetPassword(id)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList)
