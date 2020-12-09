import React, { useState, useEffect } from 'react';
import Categorias from '../Categorias';
import ProductsCards from '../ProductsCards';
import { connect } from 'react-redux';
import { getProducts, getProductsBySearch, getProductsByCategory} from '../../stores/actions/productActions';
import { getCategories } from '../../stores/actions/categoryActions';
import { userLoginLS } from '../../stores/actions/userActions';
import { load } from '../../stores/actions/generalActions';
import styles from './Catalogo.module.scss';
import Frame from '../Frame'


function Catalogo(props) {
  const { match, location, getProducts, getCategories, getProductsByCategory, getProductsBySearch, 
    userLoginLS, isLoading, load, products } = props;
  
  console.log(location.search)
  const searchProduct = location.search
  const nameCategory = match.params.name

  useEffect(() => {
    console.log('se ejecuta este useEffect')
    if (nameCategory) {
      console.log('primer if')
      getProductsByCategory(nameCategory)
    } else if (searchProduct) {
      console.log('segundo if')
      getProductsBySearch(searchProduct) 
    } else {
      console.log('tercer if')
      load()
      setTimeout(() => {
        getProducts()
      }, 3000)
    }
  }, [nameCategory, searchProduct])

  useEffect(() => {
    if (localStorage.getItem('userLogged')) {
      const user = JSON.parse(localStorage.getItem('userLogged'))
      userLoginLS(user)
    }
    getCategories()
  }, [])

  return (
    <>
      <div className='bg-dark'>
        <Frame>
          <Categorias />
        </Frame>
      </div>
      {console.log('isloading: '+isLoading)}
      {console.log('aqui products es: '+ JSON.stringify(products))}

      {
        isLoading? 
        <div className='text-center'>
          <div className={`${styles.ldsRoller}`}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
        : <div className='container-fluid px-5'>
        <ProductsCards 
         products = {products}
        />
      </div>
      }
      
    </>
  )
}

const mapStateToProps = ( state ) => {
  const { categoryReducer, generalReducer, productReducer } = state
  return {
    products: productReducer.products,
    categories: categoryReducer.categories,
    isLoading: generalReducer.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(getProducts()),
    getCategories: () => dispatch(getCategories()),
    getProductsBySearch: (searchProduct) =>
      dispatch(getProductsBySearch(searchProduct)),
    getProductsByCategory: (nameCategory) =>
      dispatch(getProductsByCategory(nameCategory)),
    userLoginLS: (user) => dispatch(userLoginLS(user)),
    load: () => dispatch(load())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalogo)
