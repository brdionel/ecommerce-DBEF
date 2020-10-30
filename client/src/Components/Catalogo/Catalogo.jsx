import React, { useState, useEffect } from 'react';
import Categorias from '../Categorias';
import ProductsCards from '../ProductsCards';
import { connect } from 'react-redux';
import { getProducts, getCategories, getProductsBySearch, getProductsByCategory,
  userLoginLS } from '../../actions';

function Catalogo(props) {
  const { match, location, getProducts, getCategories, getProductsByCategory, getProductsBySearch, 
    userLoginLS } = props;
  
  console.log(location.search)
  const searchProduct = location.search
  const nameCategory = match.params.name

  useEffect(() => {
    if (nameCategory) {
      getProductsByCategory(nameCategory)
    } else if (searchProduct) {
      getProductsBySearch(searchProduct) 
    } else {
      getProducts()
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
        <Categorias />
      </div>

      <div className='container-fluid px-5'>
        <ProductsCards />
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  products: state.products,
  categories: state.categories,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(getProducts()),
    getCategories: () => dispatch(getCategories()),
    getProductsBySearch: (searchProduct) =>
      dispatch(getProductsBySearch(searchProduct)),
    getProductsByCategory: (nameCategory) =>
      dispatch(getProductsByCategory(nameCategory)),
    userLoginLS: (user) => dispatch(userLoginLS(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalogo)
