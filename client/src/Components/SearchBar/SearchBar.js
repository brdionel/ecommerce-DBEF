import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import styles from './SearchBar.module.scss'

const customInput = {
	minWidth: '400px',
}

function SearchBar() {
	const [productSearch, setProductSearch] = useState('')
  const history = useHistory()
  
  const handleChange = (e) =>{
    setProductSearch(e.target.value);
  }

  const handleClose = () => {
    setProductSearch('');
  }
  
  const handleClick = () => {
		history.push(`/?search=${productSearch}`)
	}

	return (
		<form className='form-inline'>
      <label className={`${styles.wrapper}`}>
        <i 
          className={`fas fa-search mr-3`}
          onClick={handleClick}
        >
        </i>
        <input
          className={`form-control mr-2 ${styles.input}`}
          style={customInput}
          type='text'
          placeholder='Buscar un producto...'
          value={productSearch}
          onChange={handleChange}
        />
        {
          productSearch.length > 0
          ? 
          <span onClick = {handleClose}>
            <i class="fas fa-times"></i>
          </span>
          : null  
        }
      </label>
		</form>
	)
}

export default SearchBar;