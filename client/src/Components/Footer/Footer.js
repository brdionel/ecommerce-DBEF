import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Frame from '../Frame';

const Footer = () => {
  return (
    <footer className='py-5 bg-dark mt-5 mx-0'>
      <Frame>
      <div className='d-flex justify-content-between'>
        <div>
          <div className='d-flex justify-content-center m-3'>
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
        <div>
          <div className='d-flex justify-content-center m-3'>
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
        <div>
          <div className='p-5'>
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
      </div>
      </Frame>
    </footer>
  )
}

export default Footer;