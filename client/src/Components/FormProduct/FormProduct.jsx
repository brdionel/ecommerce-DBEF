import React, { useState, useEffect } from 'react'
import { validate } from './validate'
import '../StyleForm.css'
import { connect } from 'react-redux'
import { addProduct, removeProduct } from '../../stores/actions/productActions'
import { FormImage } from '../FormImage/FormImage'
import { useHistory } from 'react-router-dom'

export function FormProduct({ match, addProduct, removeProduct, userLogged }) {
	let id = match.params.productId
	const history = useHistory()
	const [categories, setCategories] = useState([])
	const [input, setInput] = useState({
		name: '',
		description: '',
		price: '',
		stock: '',
		image: '',
	})

	const [errors, setErrors] = useState({
		name: '',
		description: '',
		price: '',
		stock: '',
		image: '',
	})

	const [inputSelect, setInputSelect] = useState([])

	const handleSelect = (e) => {
		const categories = Array.from(e.target.selectedOptions).map(
			(category) => category.value
		)
		console.log(categories)
		setInputSelect(categories)
	}

	useEffect(() => {
		if (id) {
			fetch(`http://localhost:3002/products/${id}`, {credentials: 'include'})
				.then((response) => {
					return response.json()
				})
				.then((product) => {
					setInput({
						...input,
						name: product.name,
						description: product.description,
						price: product.price,
						stock: product.stock,
						image: product.image,
					})
				})
				.catch()
		}
	}, [])

	useEffect(() => {
		fetch(`http://localhost:3002/category`, {credentials: 'include'})
			.then((response) => {
				return response.json()
			})
			.then((cat) => {
				setCategories(cat)
			})
			.catch()
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

	const handleSubmit = function (e) {
		e.preventDefault()
		const product = {
			name: input.name,
			description: input.description,
			price: input.price,
			stock: input.stock,
			image: input.image,
			categories: inputSelect,
		}
		id ? updateProduct(product) : createProduct(product)
	}

	const createProduct = function (newProduct) {
		addProduct(newProduct)
		resetForm()
	}

	const updateProduct = function (product) {
		console.log(product)
		fetch(`http://localhost:3002/products/${id}`, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(product),
		})
			.then((res) => {
				if (res.status === 400) {
					alert('No podes dejar campos vacíos')
				} else {
					alert('Producto Modificado')
				}
				resetForm()
			})
			.catch()
	}

	const deletedProd = function () {
		removeProduct(id)
		resetForm()
	}

	const resetForm = function (e) {
		if (e) e.preventDefault()
		setInput({
			name: '',
			description: '',
			price: '',
			stock: '',
			image: '',
			category: '',
		})

		setErrors({
			name: '',
			description: '',
			price: '',
			stock: '',
		})
	}

	return (
		<div>
		{ userLogged.isAdmin ?
		<div key={id} className='formStyle'>
			{id ? <h3>Modificar producto</h3> : <h3>Crear producto</h3>}
			<hr />
			<form id='myForm' onSubmit={handleSubmit}>
				{id ? (
					<div id='closeIcon' className='row'>
						<button
							type='button'
							onClick={deletedProd}
							className='btn btn-sm btn-danger'
						>
							Eliminar Producto
						</button>
					</div>
				) : null}
				<div className='inputContainer'>
					<label>Nombre: </label>
					<input
						type='text'
						name='name'
						onChange={handleInputChange}
						value={input.name}
						className={`${errors.name && 'border border-danger'}`}
					/>
					{errors.name && (
						<span className='erros text-danger'>
							<small>{errors.name}</small>
						</span>
					)}
				</div>
				<div className='inputContainer'>
					<label>Descripcion: </label>
					<textarea
						name='description'
						onChange={handleInputChange}
						value={input.description}
						className={`${
							errors.description && 'border border-danger'
						}`}
					/>
					{errors.description && (
						<span className='erros text-danger'>
							<small>{errors.description}</small>
						</span>
					)}
				</div>
				<div className='inputContainer'>
					<label>Precio: </label>
					<input
						type='number'
						name='price'
						onChange={handleInputChange}
						value={input.price}
						placeholder='$'
						className={`${errors.price && 'border border-danger'}`}
					/>
					{errors.price && (
						<span className='erros text-danger'>
							<small>{errors.price}</small>
						</span>
					)}
				</div>
				<div className='inputContainer'>
					<label>Stock: </label>
					<input
						type='number'
						name='stock'
						onChange={handleInputChange}
						value={input.stock}
						className={`${errors.stock && 'border border-danger'}`}
					/>
					{errors.stock && (
						<span className='erros text-danger'>
							<small>{errors.stock}</small>
						</span>
					)}
				</div>
				<FormImage setImages={setInput} />
				<label> seleccione una categoria: </label>
				<div>
					<select
						multiple
						className='form-control'
						name='categories'
						onChange={handleSelect}
						value={inputSelect}
					>
						{categories.map((e) => (
							<option key={e.id} value={e.id}>
								{e.name}
							</option>
						))}
					</select>
				</div>
				<div className='buttonContainer'>
					<button
						onClick={(e) => resetForm(e)}
						className='btn btn-danger'
					>
						{' '}
						Cancelar{' '}
					</button>

					{id ? (
						<input
							type='submit'
							value='Modificar'
							className='btn btn-info'
						/>
					) : null}
					{errors.name || errors.description || errors.price || errors.stock || !input.image ?
						null : (
							<input
								type='submit'
								value='Crear'
								className='btn btn-primary ml-2'
							/>
						)
					}
				</div>
			</form>
		</div>
		: history.push('/') }
		</div>
	)
}

const mapStateToProps = (state) => {
	const { productReducer, categoryReducer, userReducer } = state;

	return {
		products: productReducer.products,
		categories: categoryReducer.categories,
		userLogged : userReducer.userLogged
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addProduct: (product) => dispatch(addProduct(product)),
		removeProduct: (id) => dispatch(removeProduct(id)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FormProduct)
