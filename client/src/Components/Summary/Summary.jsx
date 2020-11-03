import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import swal from 'sweetalert'
import { cleanOrder, clearCartLocalS } from '../../stores/actions/cartActions'
import { useHistory } from 'react-router-dom'

const Summary = (props) => {
  const { products, cleanOrder, productsGuest, userLogged, clearCartLocalS} = props;
  const [total, setTotal] = useState(0)
  const history = useHistory()

  useEffect(() => {
    if (products.length >= 1) {
      const totalProducts = products.reduce(
        (acc, el) => acc + el.order_product.price * el.order_product.quantity,
        0
      )
      setTotal(totalProducts)
    } else {
      const totalProducts = productsGuest.reduce((acc, el) => {
        if (el.quantity) return acc + el.price * el.quantity
        return acc + el.price * 1
      }, 0)
      setTotal(totalProducts)
    }
  }, [products, productsGuest])

  return (
    <div className='sticky-top'>

      <h3>Resumen</h3>
      <hr />
      <h3>Total $ {total}</h3>
      <hr />
      
      <button className='btn btn-primary' 
        disabled = {products.length === 0 && productsGuest.length === 0  ? true : false}
        onClick={()=>{
            if (userLogged) {
               history.replace('/checkout/order')
        } else {
          swal({
            title: 'Inicia sesión',
            text: 'Para finalizar esta compra es necesario iniciar sesion ¿Desea continuar?',
            icon: 'warning',
            buttons: ['No', 'Si'],
            dangerMode: true,
          }).then((res) => (res ? history.push('/user/login') : null))
        }

        }}
      >
        Finalizar compra
      </button>
      <button
        onClick={() => {
          if (!userLogged) {
            swal({
              title: 'Vaciar carrito',
              text: 'Seguro desea eliminar TODOS los productos?',
              icon: 'warning',
              buttons: ['No', 'Si'],
              dangerMode: true,
            }).then((res) => {
              if (res) {
                localStorage.setItem('carrito', JSON.stringify([]))
                clearCartLocalS()
              } else {
                return null
              }
            })
          } else {
            swal({
              title: 'Vaciar carrito',
              text: 'Seguro desea eliminar TODOS los productos?',
              icon: 'warning',
              buttons: ['No', 'Si'],
              dangerMode: true,
            }).then((res) => (res ? cleanOrder() : null))
          }
        }}
        className='btn btn-danger ml-3'
      >
        Vaciar carrito
      </button>
    </div>
  )
}

const mapStateToProps = (store) => {
  const { cartReducer, userReducer } = store;
  return {
    products: cartReducer.cart,
    productsGuest: cartReducer.cartGuest,
    userLogged: userReducer.userLogged,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cleanOrder: () => dispatch(cleanOrder()),
    clearCartLocalS: () => dispatch(clearCartLocalS()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Summary)