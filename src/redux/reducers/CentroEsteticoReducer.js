// Importazione dei tipi di azioni definiti nelle action
import { 
  SET_FIELD,
  SET_ERROR,
  RESET_ALL,
  RESET_ERROR,
 REG_BEAUTY_CENTER
   
  } from "../actions/centroEsteticoActions";
  

  const initialState = {
    form: {
      name: "", 
      surname: "", 
      email: "", 
      password: "",
      nameBeautyCenter:"",
      address: "",
      city: "" ,
      trattamenti:""
    },
    error: {}, 
    result: {}, 
    
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
  
      
      case REG_BEAUTY_CENTER:
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
          ...state, // Mantiene il resto dello stato immutato
          result: {}, // Resetta i risultati
          error: {}, // Resetta gli errori
          form: {
            name: "", // Resetta il campo nome
            surname: "", // Resetta il campo cognome
            email: "", // Resetta il campo email
            password: "", 
            nameBeautyCenter:"",
      address: "",
      city: "" ,
       trattamenti:""
          },
         
        };
  
      // Azione per resettare solo i messaggi di errore o successo
      case RESET_ERROR:
        return {
          ...state, // Mantiene il resto dello stato immutato
          result: {}, // Resetta i risultati
          error: {}, // Resetta gli errori
        };
  
      // Azione di default: ritorna lo stato attuale senza modificarlo
      default:
        return state;
    }
  };
  
  // Esportazione del reducer come default
  export default centroEsteticoReducer;
  