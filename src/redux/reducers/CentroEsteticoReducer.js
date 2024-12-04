import { 
  SET_FIELD_REGISTER_BC,  
  SET_ERROR,
  RESET_ALL,
  RESET_ERROR,
  REG_CENTRO_ESTETICO,
  GET_CLIENTI
} from "../actions/centroEsteticoActions";

import { DELETE } from "../actions/accessTokenActions";

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
  result: null, 
  clients: []
};

const centroEsteticoReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_FIELD_REGISTER_BC:
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
        error: {},  
      };

    case SET_ERROR:
      
      return {
        ...state,
        error: action.payload || { message: "An unknown error occurred" },  
      };

    case RESET_ALL:
      return {
        ...state,
        result: null,
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
        error: {},  
      };

    case GET_CLIENTI:
      return {
        ...state,
        clients: action.payload, 
        error: {},  
      };

    case DELETE:
      return initialState; 

    default:
      return state;
  }
};

export default centroEsteticoReducer;
