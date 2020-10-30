import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getProductDetail, addProductCart, addReviews, addProductCartGuest} from '../../actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavBar from '../../Components/NavBar'
import Footer from '../../Components/Footer'
import styles from './ProductDetails.module.scss'
import moment from 'moment';

var idLocale = require('moment/locale/id'); 
moment.locale('id', idLocale);

function Product( props ) {

  const { match, productDetail, getProductDetail, addProduct, user, addReviews,
    addProductCartGuest}  = props;
  const [comment, setComment] = useState('')
  const [score, setScore] = useState(0)
  const [promedio, setPromedio] = useState(0)
  const [visible, setVisible] = useState(false)
  const [reload, setReaload] = useState(false)

  const handleInputComment = (e)  => {
    setComment(e.target.value)
  }

  const handleSubmit = function (e) {
    e.preventDefault()
    if(score === 0) {
      alert('Dale alguna estrellita al producto')
    } else {
      addReviews(productDetail.id, comment, user.id, score)
      setComment('')
      setScore(0)
      setReaload(!reload)
      setVisible(false)
    }
    console.log(productDetail.id, comment, user.id, score)
  }

  const handleScore = (number) =>{
    setScore(number);
    console.log('le dio: '+ number + ' estrellas')
  }

  const handleVisible = () => {
    setVisible(true)
  }

  let id = match.params.id

  useEffect(() => {
    getProductDetail(id)
  }, [reload, id])

  let stock_quantity = productDetail.stock

  var isOutOfStock = false

  if (stock_quantity === 0) {
    isOutOfStock = true
  }

  const starY = 
    <FontAwesomeIcon
     className={styles.starFill}
      icon={['fas', 'star']}
    />
  
  const starN = 
    <FontAwesomeIcon 
      className={styles.starEmpty} 
      icon={['fas', 'star']} 
    />

  let reviews = productDetail.reviews

  useEffect(()=> {
    let suma = 0;
    suma = reviews && reviews.reduce( (acc, r) => acc + r.score , 0)
    let prom = reviews && suma/ reviews.length;
    setPromedio(prom)
  }, [reviews])

  return (
    <>
    <NavBar />
    <div className={styles.wrapper}>
      <h3 className='text-black-50'>{productDetail.name}</h3>
      <hr />
      <div className={styles.wrapperContent}>
        <img
          src={`http://localhost:3002/images/${productDetail.image}`}
          alt={productDetail.name}
          className={styles.image}
        />

        <div className='p-3'>
          <h3 className='display-3'>${productDetail.price}</h3>
          <div>
            {isOutOfStock ? (
              <div className='out-stock-style'>
                <h4>Sin Stock</h4>
              </div>
            ) : (
              <div className='in-stock'>
                <h4>Disponibles: {productDetail.stock} </h4>
              </div>
            )}
          </div>
          {
            !Number.isNaN(promedio)?
            <p className={styles.promedio}>
              {promedio && promedio.toFixed(1)}
              <FontAwesomeIcon
                className={styles.star}
                icon={['fas', 'star']}
              />
            </p> : null
          }
          <hr />
          <p className='lead'>{productDetail.description}</p>
          <div className='d-flex flex-wrap'>
            {productDetail.categories &&
              productDetail.categories.map((category) => (
                <Link to={`/${category.name}`} key={category.id}>
                  <p className='lead px-1'>
                    {category.name}
                    {productDetail.categories.length > 1 ? ' |' : ''}
                  </p>
                </Link>
              ))}
          </div>
          <hr />
          {user.isAdmin ? (
            <Link to={`/product/admin/${productDetail.id}`}>
              <button
                type='button'
                className={`btn btn-secondary ${
                  isOutOfStock ? 'displayNone' : ''
                }`}
              >
                Modificar/Eliminar Producto
              </button>
            </Link>
          ) : null}

          <Link to={`/admin/cart`}>
            <button
              onClick={
                !user
                  ? () => {
                      const carrito = JSON.parse(
                        localStorage.getItem('carrito')
                      )
                      let index = carrito.findIndex(
                        (prod) => prod.id === productDetail.id
                      )
                      if (index < 0) {
                        carrito.push(productDetail)
                      } else {
                        carrito[index].quantity =
                          parseInt(carrito[index].quantity, 10) + 1 || 2
                      }
                      localStorage.setItem('carrito', JSON.stringify(carrito))
                      addProductCartGuest(carrito)
                    }
                  : () => addProduct(productDetail.id, productDetail.price)
              }
              className={`${isOutOfStock ? 'displayNone' : ''} ${styles.addCartButton} btn`}
            >
              <FontAwesomeIcon icon={['fas', 'cart-plus']} /> Agregar Carrito{' '}
            </button>
          </Link>
        </div>
      </div>
      <hr/>
      
      <div>       
        <div className = {styles.opinions}>
          <h2>Opiniones sobre el producto</h2>
          <span onClick = {handleVisible}>
            { user?
              <FontAwesomeIcon 
                className = {styles.plus} 
                icon={['fas', 'plus']} 
              /> : null
            }
          </span>
        </div>   
      
        <hr />
        {user && visible ? (
        <div className = {styles.wrapperReview}>
          <div>
            <h5 className=''>Que te parecio este producto? </h5>    
            <ul className='d-flex px-0'>
              {
                [1, 2, 3, 4, 5].map( number => (
                  <li 
                    key={number} 
                    onClick = {() => handleScore(number)}
                    className={styles.liscore}
                  >
                    {
                      score >= number? starY : starN
                    }
                  </li>
                )) 
              }
            </ul>
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              className='form-control'
              rows='3'
              name='comments'
              value = {comment}
              onChange={handleInputComment}
            />
            <div>
              <input
                className='text-right btn btn-info m-2'
                type='submit'
                value='Enviar reseña'
              />
              <button 
                className = {`btn btn-outline-danger`}
                onClick = {handleVisible}
              >
                Cancelar
              </button>
            </div>
            <hr className='mb-2'/>
          </form>
        </div>
      ) : null}

        <div>
          {reviews && reviews.length === 0 ? (
            <div className='alert bg-light text-center' role='alert'>
              <h6 className='alert-heading text-secondary'>
                {' '}
                No hay ninguna reseña de este producto
              </h6>
            </div>
          ) : (
            <div>
              {reviews &&
                reviews.map((r, i) =>
                  <div className={styles.reviews}>
                    {console.log(r)}
                    <p>{r.comments}</p>
                    <small className='font-weight-bold'>{moment(r.createdAt).format('L')}</small>
                  </div>
                )
              }
            </div>
          )}
        </div>
      </div>
    </div>
    <Footer />
  </>
  )
}

const mapStateToProps = (state) => ({
  productDetail: state.productDetail,
  productCart: state.cart,
  user: state.userLogged,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getProductDetail: (id) => dispatch(getProductDetail(id)),
    addProduct: (idProduct, price) =>
      dispatch(addProductCart(idProduct, price)),
    addReviews: (id, comments, userId, score) =>
      dispatch(addReviews(id, comments, userId, score)),
    addProductCartGuest: (product) => dispatch(addProductCartGuest(product)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)