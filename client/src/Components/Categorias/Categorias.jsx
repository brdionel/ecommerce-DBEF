import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import Dropdown from '../Dropdown';
import styles from './Categorias.module.scss';

const Categorias = ({ categories }) => (
  <>
    <ul className='nav py-3 mb-5 justify-content-between'>
      <Dropdown 
        categories = {categories}
      />
      {categories &&
        categories.map((c, i) =>
          i < 5 ? (
            <li key={c.id + c.name}>
              <NavLink 
                to={`/${c.name}`} 
                className='nav-link text-light'
                activeClassName= {styles.activo}
              >
                {c.name}
              </NavLink>
            </li>
          ) : null
        )}
    </ul>
  </>
  )

const mapStateToProps = (state) => ({
  categories: state.categoryReducer.categories,
})

export default connect(mapStateToProps)(Categorias)