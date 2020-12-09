import React from 'react'
import ProductCard from '../ProductCard'
import { connect } from 'react-redux'
import styles from './ProductsCards.module.scss'
import Frame from '../Frame';

const ProductsCards = ({ products }) => (
  <Frame>
    {products && !products[0]? (
      <div className='alert alert-success bg-danger text-center' role='alert'>
        <h4 className='alert-heading text-white'>
          No hay productos para mostrar
        </h4>
      </div>
    ) : (
      <div className={styles.grid}>
        { products && products.map( p => (
          <ProductCard
            key={p.id}
            id={p.id}
            name={p.name}
            image={p.image}
            price={p.price}
            description={p.description}
          />
        ))}
      </div>
    )}
  </Frame>
)

const mapStateToProps = (state) => {
  const { productReducer } = state;
  return {
    products: productReducer.products,
  }
}

export default connect(mapStateToProps, {})(ProductsCards)