import React, { useState, useEffect } from 'react'
import '../StyleForm.css'
import { addCategory, removeCategory } from '../../actions'
import { connect } from 'react-redux'
import swal from 'sweetalert'
import { useHistory } from 'react-router-dom'

export function FormCategory({ match, addCategory, removeCategory, userLogged }) {
	
	// let id = match.params.idCategory
	let name = match.params.name
	const history = useHistory()
	const [input, setInput] = useState({
		name: '',
		description: '',
	})

	const handleInputChange = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		})
	}

	const resetForm = () => {
		setInput({
			name: '',
			description: '',
		})
	}

	useEffect(() => {
		if (name) {
			fetch(`http://localhost:3002/category/${name}`, {credentials: 'include'})
				.then((response) => response.json())
				.then(function (category) {
					setInput(category)
				})
				.catch(function (err) {
					alert('categoria no encontrada')
				})
		}
	}, [name])

	const createCategory = () => {
		addCategory(input)
		.then(response => {
			if(response.success){
				swal(response.message, '', 'success')
				resetForm()
			} else {
				swal(response.message, '', 'error')
			}
		})
		.catch(error => {
			swal(error.message, '', 'error')
		})
	}

	const updateCategory = () => {
		fetch(`http://localhost:3002/category/${input.id}`, {
			method: 'PUT',
			credentials: 'include',
			body: JSON.stringify(input),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then(() => {
				alert('Categoria modificada')
				resetForm()
			})
			.catch((err) => alert(err))
	}

	const deleteCat = function () {
		removeCategory(input.id)
		resetForm()
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		createCategory()
	}

	return ( 
		<div>
		{ userLogged.isAdmin ? 
		<div className='formStyle'>
			{name ? <h3> Modificar Categoria</h3> : <h3>Crear Categoria</h3>}
			<hr />
			<form onSubmit={handleSubmit}>
				{name ? (
					<div id='closeIcon' className='row'>
						<button
							onClick={deleteCat}
							className='btn btn-sm btn-danger mb-3'
						>
							Eliminar Categoria
						</button>
					</div>
				) : null}
				<div className='form-group'>
					<label>Nombre: </label>
					<input
						className='form-control'
						type='text'
						name='name'
						onChange={handleInputChange}
						value={input.name}
						required
					/>
				</div>
				<div className='form-group'>
					<label>Descripcion: </label>
					<textarea
						className='form-control'
						name='description'
						onChange={handleInputChange}
						value={input.description}
						required
					/>
				</div>

				<div className='modal-footer'>
					<button onClick={resetForm} className='btn btn-danger'>
						{' '}
						Cancelar{' '}
					</button>
					{name ? (
						<input
							type='button'
							onClick={updateCategory}
							value='Modificar categoria'
							className='btn btn-info'
						/>
					) : (
						<input
							type='submit'
							value='Crear categoria'
							className='btn btn-primary'
						/>
					)}
				</div>
			</form>
		</div>
		: history.push('/') }
		</div>
	)
}

const mapStateToProps = (state) => ({
	products: state.products,
	categories: state.categories,
	userLogged : state.userLogged
})

const mapDispatchToProps = (dispatch) => {
	return {
		addCategory: (category) => dispatch(addCategory(category)),
		removeCategory: (id) => dispatch(removeCategory(id)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FormCategory)
