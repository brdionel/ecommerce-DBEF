import React, { useState } from 'react'

export const FormImage = ({ setImages }) => {
	const [state, setState] = useState([])
	const [creado, setCreado] = useState(false)
	const [noSubido, setnoSubido] = useState(false);

	const handleChange = (e) => {
		setState(e.target.files)
	}
	const formImage = new FormData()

	const handleSubmit = (e) => {
		e.preventDefault()

		for (let i = 0; i < state.length; i++) {
			formImage.append('images', state[i])
		}

		fetch(`http://localhost:3002/images`, {
			method: 'POST',
			credentials: 'include',
			body: formImage,
		})
			.then((res) => res.json())
			.then((data) => {
				setImages((prevState) => {
					return {
						...prevState,
						image: data,
					}
				})
				setnoSubido(false);
				setCreado(true);
				setTimeout(()=> {
					setCreado(false);
				}, 5000)
			})
			.catch( err => {
				setCreado(false);
				setnoSubido(true);
			})
	}

	return (
		<div className='form-group'>
			<label>Subir imagenes</label>
			<input
				onChange={handleChange}
				type='file'
				className='form-control-file'
				name='images'
				multiple
			/>
			<div className="d-flex align-items-center">
				<button
					type='button'
					onClick={handleSubmit}
					className='btn btn-info mt-1'
					>
					Subir imagen
				</button>
				{creado? <div class="alert alert-success  ml-5 mb-0 mt-1 px-3 py-1" role="alert">
							Se subió con exito!
							</div>
						: '' }
				{noSubido? <div class="alert alert-danger  ml-3 mb-0 mt-1 px-3 py-1" role="alert">
							Error! No se pudo subir.
							</div>: '' }
			</div>
		</div>
	)
}
