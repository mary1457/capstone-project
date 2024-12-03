import {
  SET_FIELD_LOGIN,
  SET_ERROR,
  RESET_ALL,
  RESET_ERROR,
  LOG_UTENTE,

} from "../actions/utenteActions";

import { LOGOUT } from "../actions/accessTokenActions";

const initialState = {
  form: {
  
    email: "",
    password: "",
  },
  error: {}, 
  utente: null, 
};

const utenteReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FIELD_LOGIN:
    
      return {
        ...state,
        form: {
          ...state.form,
          [action.payload.id]: action.payload.value,
        },
      };


      case RESET_ALL:
  return initialState;


    case SET_ERROR:
     
      return {
        ...state,
        error:  action.payload ,
      };

  

    case RESET_ERROR:
      
      return {
        ...state,
        error: {},
      };

    case LOG_UTENTE:
     
      return {
        ...state,
        utente: action.payload,
        error: {}, 
      };


      case LOGOUT:
              return initialState;

    default:
     
      return state;
  }
};

export default utenteReducer;
