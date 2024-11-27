import {
  GET_PRENOTAZIONI,
  DELETE_PRENOTAZIONI,
  SET_ERROR,
  ADD_PRENOTAZIONI,
  GET_TODAY
} from "../actions/prenotazioniActions";


const initialState = {
  prenotazioni: [],  
  error: null ,
  today: []     
};

const prenotazioniReducer = (state = initialState, action) => {
  switch (action.type) {

    
    case GET_PRENOTAZIONI:
      return {
        ...state,
        prenotazioni: action.payload,
        error: null,  
      };

      case GET_TODAY:
      return {
        ...state,
        today: action.payload,
        error: null,  
      };

      case ADD_PRENOTAZIONI:
     
      return {
        ...state,
        prenotazioni: [...state.prenotazioni, action.payload], 
      };

   
    case DELETE_PRENOTAZIONI:
      return {
        ...state,
        prenotazioni: state.prenotazioni.filter((item) => item.id !== action.payload),  
        error: null, 
      };

    
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,  
      };

    default:
      return state;
  }
};

export default prenotazioniReducer;
