import {
  GET_PRENOTAZIONI,
  DELETE_PRENOTAZIONI,
  SET_ERROR,
  ADD_PRENOTAZIONI,
  GET_TODAY,
  GET_MONTH, 
  RESET_ALL
} from "../actions/prenotazioniActions";
import { LOGOUT } from "../actions/accessTokenActions";

const initialState = {
  prenotazioni: [],  
  error: {},
  today: [] ,
  month:[]    
};

const prenotazioniReducer = (state = initialState, action) => {
  switch (action.type) {

    
    case GET_PRENOTAZIONI:
      return {
        ...state,
        prenotazioni: action.payload,
        error: {},  
      };

      case GET_TODAY:
      return {
        ...state,
        today: action.payload,
        error: {},  
      };

      case GET_MONTH:
        return {
          ...state,
          month: action.payload,
          error: {},  
        };

      case ADD_PRENOTAZIONI:
     
      return {
        ...state,
        prenotazioni: [...state.prenotazioni, action.payload], 
        error: {}, 
      };

   
    case DELETE_PRENOTAZIONI:
      return {
        ...state,
        prenotazioni: state.prenotazioni.filter((item) => item.id !== action.payload),  
        error: {},  
      };

    
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,  
      };

      case RESET_ALL:
      
      return {
        ...state,
        error: {},
      };

      case LOGOUT:
        return initialState;

    default:
      return state;
  }
};

export default prenotazioniReducer;
