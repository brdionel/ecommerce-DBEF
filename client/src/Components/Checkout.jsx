import React, {useState} from 'react'
import emailjs from 'emailjs-com'
import swal from 'sweetalert'
import './StyleForm.css'
import { useHistory } from 'react-router-dom'
import { connect } from "react-redux";

export function ContactUs({userLogged}){
 const history = useHistory()
 const [errors, setErrors] = useState({
    name: '', to: '',  address: ''
})   
const [input, setInput] = useState({
    name: '', to: '',  address: ''
})
const handleInputChange = function (e) {
    setInput({
        ...input,
        [e.target.name]: e.target.value,
    })
    setErrors(
        validate({
            ...input,
            [e.target.name]: e.target.value,
        })
    )
}  
const validate = function(input){
    let errors = {};   
    if(!input.name){
        errors.name = "Nombre requerido"
    }
    if(!input.to){
        errors.to = "e-mail requerido"     
    } else if (!/\S+@\S+\.\S+/.test(input.to)){ 
        errors.to = "e-mail no válido"
    }
    if(!input.address){
        errors.address = "Dirección requerida"
    }
    return errors;
} 
     
    return (
        <div>  { userLogged ?
            <div>
            <div className="jumbotron jumbotron-fluid text-center">
                <h4 className="display-4"> Confirmación de Compra </h4>
                <hr/>
                <p className="lead"> Estos datos son necesarios para finalizar tu compra. 
                Asegura que sean correctos antes de confirmar </p>
            </div>     
            <form className='formSend'  onSubmit={(e)=> {
                   e.preventDefault() 
                const serviceID = 'default_service';
                const templateID = 'template_enridgq';
                const name = emailjs.init('user_VNYvVYcmpbFh0oZLVTUlz')
                const value = e.target
                    fetch('http://localhost:3002/orders/user/checkout', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    if(response.status === 500 ){
                         swal('No hay stock disponible. No podemos precesar su compra.')
                    }else{
                      emailjs.sendForm( serviceID, templateID, value, name)
                      swal('Tu compra fue procesada con exito. En breve recibiras un e-mail de confirmación')
                        .then(res => res ? history.push('/') : null )
                          
                    }                  
                }).catch(() => swal('Error al finalizar su compra. Intentar otra vez!'))
            }}>
                    <div class="col-md-12 mb-2">
                    <label for='name'>Nombre: </label>
                    <input type="text" className="form-control" id="name" name="name" 
                    onChange={handleInputChange} required/>
                    {errors.name && 
                    ( <span className='error text-danger'><small>{errors.name}</small></span> )}
                    </div>
                    <div class="col-md-12 mb-2">
                    <label for='to'>Email: </label>
                    <input type="text" className="form-control" id='to' name='to' 
                    onChange={handleInputChange} required/>
                    {errors.to && 
                    ( <span className='error text-danger'><small>{errors.to}</small></span> )}
                    </div> 
                    <div class="col-md-12 mb-2">
                    <label for='address'>Dirección de entrega</label>
                    <input type="text" name='address' id='address' className="form-control" 
                    onChange={handleInputChange} required/>
                    {errors.address && 
                    ( <span className='error text-danger'><small>{errors.address}</small></span> )}
                    </div>                    
                    <hr/>
                    <div className='sendEmail'>
                        <button class="btn btn-primary" type="submit" 
                        disabled= {(!errors.name && !errors.to && 
							!errors.address ) && (input.address && 
							input.name && input.to) ? false : true}
                       
                            >Confirmar compra</button>
                    </div>
           </form>
        
        <script type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/emailjs-com@2/dist/email.min.js"></script>
        </div> : history.push('/') }
  </div>
      
    )
}

const mapStateToProps = state => {
return {
    userLogged: state.userLogged
}
}  
export default connect(mapStateToProps, {})(ContactUs)