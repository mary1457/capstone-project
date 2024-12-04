import { 
  SET_FIELD_REGISTER, 
  SET_ERROR, 
  RESET_ALL, 
  RESET_ERROR, 
  REG_CLIENTE 
} from "../actions/clienteActions";

import { DELETE } from "../actions/accessTokenActions";

const initialState = {
  form: {
    nome: "", 
    cognome: "", 
    email: "", 
    password: "",
  },
  error: {}, 
  result: null, 
};

const clienteReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FIELD_REGISTER:
      return {
        ...state, 
        form: {
          ...state.form, 
          [action.payload.id]: action.payload.value, 
        },
      };

    case REG_CLIENTE:
      return {
        ...state, 
        result: action.payload, 
        error: {},  
      };

    case SET_ERROR:
      return {
        ...state, 
        error: action.payload || { message: "An unknown error occurred" },  
      };

    case RESET_ALL:
      return initialState;  

    case RESET_ERROR:
      return {
        ...state, 
        error: {},  
      };

    case DELETE:
      return initialState;  

    default:
      return state;
  }
};

export default clienteReducer;
