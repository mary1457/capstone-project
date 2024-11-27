import { 
    SET_FIELD,
    SET_ERROR,
    RESET_ALL,
    RESET_ERROR,
    REG_CENTRO_ESTETICO,  
    GET_CLIENTI
  } from "../actions/centroEsteticoActions";
  
  const initialState = {
    form: {
      nome: "", 
      cognome: "", 
      email: "", 
      password: "",
      nomeCentroEstetico: "",
      indirizzo: "",
      citta: "", 
      trattamento: ""
    },
    error: {}, 
    result: {}, 
    clients:[]
  };
  
  const centroEsteticoReducer = (state = initialState, action) => {
    switch (action.type) {
    
      case SET_FIELD:
        return {
          ...state, 
          form: {
            ...state.form, 
            [action.payload.id]: action.payload.value, 
          },
        };
  
      
      case REG_CENTRO_ESTETICO:
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
            nomeCentroEstetico: "",
            indirizzo: "",
            citta: "", 
            trattamento: "",
          },
        };
  
     
      case RESET_ERROR:
        return {
          ...state, 
          result: {}, 
          error: {}, 
        };

        case GET_CLIENTI:
          return {
            ...state,
            clients: action.payload,
           
          };
  
      default:
        return state;
    }

   
  };
  
  export default centroEsteticoReducer;
  