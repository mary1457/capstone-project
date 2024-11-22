import {
   
    GET_PRENOTAZIONI,
    
    DELETE_PRENOTAZIONI,
  
   
  } from "../actions/prenotazioniActions";


  const initialState = {
   prenotazioni:[]
  };

  const prenotazioniReducer = (state = initialState, action) => {
    switch (action.type) {
  
      
  
  
      case GET_PRENOTAZIONI:
        return {
          ...state,
          prenotazioni: action.payload,
        };
  
  
     
  
  
      case DELETE_PRENOTAZIONI:
        return {
            ...state,
            prenotazioni: state.prenotazioni.filter((item) => item.id !== action.payload),  
        };
  
  
      
  
      
      default:
        return state;
    }
  };

  export default prenotazioniReducer;