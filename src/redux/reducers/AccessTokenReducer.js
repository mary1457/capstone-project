
import { 
    SET_TOKEN, 
    
   
  } from "../actions/AccessTokenAction";
const initialState = {
   token: {}
  };

  const accessTokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
              ...state, // Mantiene il resto dello stato immutato
              token: action.payload, // Salva il risultato della registrazione
            };
  
      default:
        return state;
    }
  };
  
  // Esportazione del reducer come default
  export default accessTokenReducer;
  