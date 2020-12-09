import React from 'react';
import style from './Frame.module.scss'

const Frame = ({children}) => {

  return(
    <div className={style.wrapper}>
      {children}
    </div>
  )
}

export default Frame