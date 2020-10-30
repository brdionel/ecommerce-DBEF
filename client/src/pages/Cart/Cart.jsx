import React from 'react'
import Shopping from '../../Components/Shopping'
import Summary from '../../Components/Summary'
import NavBar from '../../Components/NavBar'
import Footer from '../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Cart = () => (
    <>
      <NavBar />
      <div className='container p-5' style={{ minHeight: '500px' }}>
        <h1>
          <FontAwesomeIcon
            icon={['fas', 'shopping-cart']}
            style={{ marginRight: '20px' }}
          />
          Carrito de compras
        </h1>
        <hr />
        <div className='row container ml-auto mr-auto'>
          <div className='col-lg-8' style={{ maxHeight: '700px', overflow:'scroll' }}>
            <Shopping />
          </div>
          <div className='col-lg-4'>
            <Summary />
          </div>
        </div>
        <hr />
      </div>
      <Footer />
    </>
  )

export default Cart;