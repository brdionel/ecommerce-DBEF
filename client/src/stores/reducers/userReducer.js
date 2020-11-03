import { GET_USERS, GET_USER_DETAIL, ADD_USER, REMOVE_USER, DELETE_USER, GET_USER_LOGGED,
PROMOTE_TO_ADMIN, RESET_PASSWORD, UPDATE_USER_LOGGED, USER_CHANGE_PASSWORD, USER_LOGGED,
USER_LOGGED_LS, USER_LOGOUT} from '../types/userTypes';

const initial_state = {
    users: [],
    userDetail: {},
    userLogged: '',
}

function userReducer(state = initial_state, action) {
    
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                users: state.users.concat(action.payload),
              }

        case GET_USERS:
            return {
                ...state,
                users: action.payload,
              }
        
        case REMOVE_USER:
            return {
                ...state,
                users: state.users.filter((user) => user.id != action.payload),
              }
        
        case GET_USER_DETAIL:
            return {
                ...state,
                userDetail: action.payload,
              }

        case GET_USER_LOGGED:
            return {
                ...state,
                userLogged: action.payload
              }
        case PROMOTE_TO_ADMIN: 
        return {
            ...state,
            userDetail: action.payload,
          }

        case DELETE_USER: 
        return {
            ...state,
            userLogged: ""
          }
        case UPDATE_USER_LOGGED:
            return {
                ...state,
                userLogged: action.payload
              }
        case RESET_PASSWORD: 
        return {
            ...state,
            users: action.payload,
          }
        case USER_LOGGED:
            return {
                ...state,
                userLogged: action.payload,
              }
        case USER_LOGGED_LS: 
        return {
            ...state,
            userLogged: action.payload
          }
        case USER_CHANGE_PASSWORD: 
        return {
            ...state,
            userLogged: action.payload,
          }
        case USER_LOGOUT:
            return {
                ...state,
                userLogged: '',
                cart: [],
              }
        
        default:
            return state;
    }        
    
}

export default userReducer;