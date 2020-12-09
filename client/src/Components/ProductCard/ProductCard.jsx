import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ProductCard.module.scss'

const ProductCard = ({ id, name, price, image, description }) => (
    <div className='col mb-4'>
      <div className={`card h-100 ${styles.cardProduct}`}>
        <Link to={`products/${id}`}>
          <div>
            <img
              className='card-img-top img-fluid bg-light'
              src={`http://localhost:3002/images/${image[0]}`}
              alt=''
            />
          </div>

          <div className={`card-body text-center text-light ${styles.details}`}>
            <h3 className='card-title'>${price}</h3>
            <h6 className='lead'>{name}</h6>
            <p className='card-text'>{description.slice(0, 40) + '...'}</p>
          </div>
        </Link>
      </div>
    </div>
  )
  export default ProductCard;