import { 
  SET_FIELD_REGISTER_BC,  // Usa il tipo giusto per impostare il campo
  SET_ERROR,
  RESET_ALL,
  RESET_ERROR,
  REG_CENTRO_ESTETICO,
  GET_CLIENTI
} from "../actions/centroEsteticoActions";

import { LOGOUT } from "../actions/accessTokenActions";

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
        result: action.payload ,  
        error: {},
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload ,  
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
        clients: action.payload ,  
      };

      case LOGOUT:
        return initialState;

    default:
      return state;
  }
};

export default centroEsteticoReducer;
