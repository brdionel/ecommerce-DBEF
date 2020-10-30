import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useState } from 'react'
import { updateCountProductInCart, updateCountProductGuest } from '../../actions'

const Counter = ( props ) => {
  const { idProduct, updateQuantity, quantity, userLogged, productQuantity, updateCountProductGuest } = props;
  const [count, setCount] = useState(quantity)
  
  const handleCount = (e) => {
    const value = e.target.value
    const carrito = JSON.parse(localStorage.getItem('carrito'))

    if (!userLogged) {
      if (value <= 1) {
        let index = carrito.findIndex((p) => p.id === idProduct)
        carrito[index].quantity = 1
        localStorage.setItem('carrito', JSON.stringify(carrito))

        updateCountProductGuest(idProduct, 1)
        setCount(1)
      } else {
        let index = carrito.findIndex((p) => p.id === idProduct)
        carrito[index].quantity = value
        localStorage.setItem('carrito', JSON.stringify(carrito))

        updateCountProductGuest(idProduct, value)
        setCount(value)
      }
    } else {
      if (value <= 1) {
        updateQuantity(idProduct, 1)
        setCount(1)
      } else {
        updateQuantity(idProduct, value)
        setCount(value)
      }
    }
  }

  useEffect(() => {
    if (!quantity && !userLogged) {
      setCount(productQuantity)
    } else {
      setCount(quantity)
    }
  }, [quantity])

  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <label>Cantidad:</label>
      <input
        type='number'
        onChange={handleCount}
        value={count}
        className='w-75'
      />
    </div>
  )
}

const mapStateToProps = (store) => {
  return {
    userLogged: store.userLogged,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateQuantity: (idProduct, count) =>
      dispatch(updateCountProductInCart(idProduct, count)),
    updateCountProductGuest: (idProduct, count) =>
      dispatch(updateCountProductGuest(idProduct, count)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)