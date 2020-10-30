import React from 'react';
import { NavLink } from 'react-router-dom';

const Dropdown = ({ categories }) => (
    <div className='dropdown'>
        <button
          className='btn btn-secondary dropdown-toggle'
          type='button'
          id='dropdownMenuButton'
          data-toggle='dropdown'
          aria-haspopup='true'
          aria-expanded='false'
        >
          CATEGORIAS
        </button>
        <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
          {categories &&
            categories.map( c => (
              <NavLink
                to={`/${c.name}`}
                key={c.name + 'dropdown'}
                className='dropdown-item'
              >
                {c.name}
              </NavLink>
            ))}
        </div>
    </div>
)


export default Dropdown;