import { CARGANDO, ERROR, YA_CARGADO } from '../types/generalTypes'

const initialstate = {
    error: false,
    isLoading: false
}

const reducer = (state = initialstate, action) =>{
    switch (action.type) {
        case CARGANDO: 
            return {
                ...state, isLoading: true
            }
        case YA_CARGADO: 
            return {
                ...state, isLoading: false
            }

        case ERROR: 
            return {
                ...state, error: action.payload
            }
            
        default:
            return state
    }
}

export default reducer;