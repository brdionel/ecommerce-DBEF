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
  
  
  // const [searchProduct, setSearchProduct] = useState(location.search)
  // const [nameCategory, setNameCategory] = useState(match.params.name)
  // console.log('searchProduct: '+ JSON.stringify(searchProduct));
  // console.log('nameCategory: '+ JSON.stringify(nameCategory));

  useEffect(() => {
    if (match.params.name) {
      getProductsByCategory(match.params.name)
    } else if (location.search) {
      console.log('segundo if')
      getProductsBySearch(location.search) 
    } else {
      getProducts()
    }
  }, [match.params.name, location.search])

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
