import {
  GET_PRENOTAZIONI,
  DELETE_PRENOTAZIONI,
  SET_ERROR,
  ADD_PRENOTAZIONI,
  GET_TODAY,
  GET_CALENDAR, 
  RESET_ERROR
} from "../actions/prenotazioniActions";
import { DELETE } from "../actions/accessTokenActions";

const initialState = {
  prenotazioni: [],  
  error: {},
  today: [],
  eventi:[]    
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

    case GET_CALENDAR:
      return {
        ...state,
        eventi: action.payload,
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
        error: action.payload || { message: "An unknown error occurred" },  
      };

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

export default prenotazioniReducer;
