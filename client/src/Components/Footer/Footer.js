import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {
  return (
    <footer className='row py-5 bg-dark mt-5 justify-content-between mx-0'>
      <div className='col-md-3 d-flex'>
        <div className='align-self-center m-3'>
          <FontAwesomeIcon
            icon={['fas', 'phone-alt']}
            className='h2'
            style={{ color: 'DodgerBlue' }}
          />
        </div>
        <div className='text-light text-center'>
          <h5 className='text-uppercase font-weight-light'>
            Atención al cliente
          </h5>
          <p>0800-1234-0000</p>
          <p>consultas@henryecommerce.com</p>
        </div>
      </div>
      <div className='col-md-3 d-flex'>
        <div className='align-self-center m-3'>
          <FontAwesomeIcon
            icon={['fas', 'clock']}
            className='h2'
            style={{ color: 'DodgerBlue' }}
          />
        </div>
        <div className='text-light text-center'>
          <h5 className='text-uppercase font-weight-light'>
            Horarios de atención
          </h5>
          <p>Lunes a viernes de 9hs a 20hs</p>
          <p>Sábados de 10hs a 14hs</p>
        </div>
      </div>
      <div className='col-md-3 text-center'>
        <h5 className='text-uppercase font-weight-light text-light mb-3'>
          Siguenos en las redes!
        </h5>
        <div className=''>
          <FontAwesomeIcon
            icon={['fab', 'facebook']}
            className='h2 mr-4'
            style={{ color: 'DodgerBlue' }}
          />
          <FontAwesomeIcon
            icon={['fab', 'twitter']}
            className='h2 mr-4'
            style={{ color: 'DodgerBlue' }}
          />
          <FontAwesomeIcon
            icon={['fab', 'instagram']}
            className='h2'
            style={{ color: 'DodgerBlue' }}
          />
        </div>
      </div>
    </footer>
  )
}

export default Footer;