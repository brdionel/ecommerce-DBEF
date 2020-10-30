import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { userChangePassword, userLogout } from '../../../actions'
import swal from 'sweetalert'

export function ResetPasswordForm({ user, userChangePassword, userLogout }) {
	const history = useHistory()
	const initialState = {
		password: '',
		confirm: '',
	}

	const [input, setInput] = useState(initialState)

	const [errors, setErrors] = useState({
		password: '',
		confirm: '',
	})

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

		if (!input.password) {
			errors.password = 'Contraseña requerida'
		} else if (input.password.trim().length < 8) {
			errors.password = 'Al menos 8 caracteres'
		} else if (
			!/^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/.test(input.password)
		) {
			errors.password =
				'Al menos una mayúscula, una minúscula y un dígito'
		}

		if (!input.confirm) {
			errors.confirm = 'Repita la contraseña'
		} else if (input.password !== input.confirm) {
			errors.confirm = 'No coincide con la contraseña'
		}

		return errors
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		userChangePassword(input.password).then(({ payload }) =>
			payload.id
				? swal({
						title: 'Exito',
						text: 'Se modifico la contraseña correctamente',
						icon: 'success',
				  })
						.then((res) => userLogout())
						.then((res) => history.replace('/user/login'))
				: swal({
						title: 'Error',
						text:
							'Hubo un error en el procedimiento, intente de nuevo',
						icon: 'error',
				  })
						.then((res) => userLogout())
						.then((res) => history.replace('/user/login'))
		)
	}

	return user && user.resetPassword ? (
		<div className='formStyle'>
			<form onSubmit={handleSubmit}>
				<legend className='pb-4'>Cambiar contraseña</legend>
				<div className='form-row'>
					<div className='col-md-6 mb-3'>
						<label>Nueva contraseña: </label>
						<input
							className='form-control'
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
						<label>Confirmar contraseña: </label>
						<input
							className='form-control'
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
				<input
					type='submit'
					disabled={
						errors.password ||
						errors.confirm ||
						input === initialState
							? true
							: false
					}
					className='btn btn-primary'
					value='Enviar'
				/>
			</form>
		</div>
	) : null
}
const mapStateToProps = (state) => ({
	user: state.userLogged,
})

const mapDispatchToProps = (dispatch) => {
	return {
		userChangePassword: (input) => dispatch(userChangePassword(input)),
		userLogout: () => dispatch(userLogout()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm)
