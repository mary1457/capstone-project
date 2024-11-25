import { 
    SET_FIELD, 
    SET_ERROR, 
    RESET_ALL, 
    RESET_ERROR, 
    REG_CLIENTE 
  } from "../actions/clienteActions";
  
  
  const initialState = {
    form: {
      nome: "", 
      cognome: "", 
      email: "", 
      password: "",
    },
    error: {}, 
    result: {}, 
  };
  
 
  const clienteReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_FIELD:
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
        };
  
      case SET_ERROR:
        return {
          ...state, 
          error: action.payload, 
        };
  
      case RESET_ALL:
        return {
          ...state, 
          result: {}, 
          error: {}, 
          form: {
            nome: "", 
            cognome: "", 
            email: "", 
            password: "", 
          },
        };
  
      case RESET_ERROR:
        return {
          ...state, 
          error: {}, 
          result: {}, 
        };
  
      default:
        return state;
    }
  };
  
  export default clienteReducer;
  