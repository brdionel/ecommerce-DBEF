import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Counter from '../Counter/Counter'
import swal from 'sweetalert'
import { getProductsCart, deleteProductInCart, deleteProductCartGuest, setProductsUser,
  getCartLS } from '../../actions'

const Shopping = ( props ) => {

  const { products, getProductsCart, deleteProductInCart, productsGuest, userLogged, deleteProductCartGuest,
    setProductsUser, getCartLS } = props;

  useEffect(() => {
    if (!userLogged) {
      const carrito = JSON.parse(localStorage.getItem('carrito'))
      getCartLS(carrito)
    } else if (userLogged && productsGuest.length >= 1) {
      setProductsUser(productsGuest).then(() => getProductsCart())
    } else if (userLogged && products.length === 0) {
      getProductsCart()
    }
  }, [])

  return (
    <div>
      {!userLogged
        ? productsGuest.map((product) => (
            <div className='card mb-3 p-3' key={product.id}>
              <div className='row'>
                <div className='col-md-4'>
                  <img
                    src={`http://localhost:3002/images/${product.image}`}
                    className='card-img'
                    alt='...'
                  />
                </div>
                <div className='col-md-5'>
                  <div className='card-body'>
                    <h5 className='card-title'>{product.name}</h5>
                    <p className='card-text'>
                      {product.description.slice(0, 50) + '...'}
                    </p>
                  </div>
                </div>
                <div className='col-md-3 d-flex align-items-center justify-content-center'>
                  <Counter
                    idProduct={product.id}
                    productQuantity={product.quantity || 1}
                  />
                  <button
                    className='btn btn-danger align-self-start'
                    onClick={() => {
                      swal({
                        title: 'Eliminar',
                        text: 'Seguro desea eliminar el producto?',
                        icon: 'warning',
                        buttons: ['No', 'Si'],
                        dangerMode: true,
                      }).then((res) => {
                        if (res) {
                          const carrito = JSON.parse(
                            localStorage.getItem('carrito')
                          )

                          const index = carrito.findIndex(
                            (p) => p.id === product.id
                          )
                          carrito.splice(index, 1)
                          localStorage.setItem(
                            'carrito',
                            JSON.stringify(carrito)
                          )

                          deleteProductCartGuest(product.id)
                        } else {
                          return null
                        }
                      })
                    }}
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          ))
        : products &&
          products.map((product) => (
            <div className='card mb-3 p-3' key={product.id}>
              <div className='row'>
                <div className='col-md-4'>
                  <img
                    src={`http://localhost:3002/images/${product.image}`}
                    className='card-img'
                    alt='...'
                  />
                </div>
                <div className='col-md-5'>
                  <div className='card-body'>
                    <h5 className='card-title'>{product.name}</h5>
                    <p className='card-text'>
                      {product.description.slice(0, 50) + '...'}
                    </p>
                  </div>
                </div>
                <div className='col-md-3 d-flex align-items-center justify-content-center'>
                  <Counter
                    idProduct={product.id}
                    quantity={product.order_product.quantity}
                  />
                  <button
                    className='btn btn-danger align-self-start'
                    onClick={() => {
                      swal({
                        title: 'Eliminar',
                        text: 'Seguro desea eliminar el producto?',
                        icon: 'warning',
                        buttons: ['No', 'Si'],
                        dangerMode: true,
                      }).then((res) =>
                        res ? deleteProductInCart(product.id) : null
                      )
                    }}
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          ))}
    </div>
  )
}

const mapStateToProps = (store) => {
  return {
    products: store.cart,
    productsGuest: store.cartGuest,
    userLogged: store.userLogged,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProductsCart: (userId) => dispatch(getProductsCart(userId)),
    deleteProductInCart: (productId) =>
      dispatch(deleteProductInCart(productId)),
    deleteProductCartGuest: (id) => dispatch(deleteProductCartGuest(id)),
    setProductsUser: (products) => dispatch(setProductsUser(products)),
    getCartLS: (carrito) => dispatch(getCartLS(carrito)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shopping)