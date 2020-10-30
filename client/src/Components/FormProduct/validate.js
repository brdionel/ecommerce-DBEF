export function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = "Nombre requerido"
    }

    if(!input.description){
        errors.description = "Descripción requerida"
    }

    if(!input.price){
        errors.price = "Precio requerido"
    }

    if(!input.stock || isNaN(input.stock) ){
        errors.stock = "Stock requerido"
    }
    
    if(!input.image){
        errors.image = "Imagen necesaria"
    }else if((!/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i.test(input.image))) {
        errors.image = "El link tiene que ser correcto"
    }

    return errors;
}