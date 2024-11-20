// Importazione dei tipi di azioni definiti nelle action
import { 
    SET_FIELD, 
    SET_REG_BEAUTY_CENTER, 
    SET_ERROR, 
    RESET_MESSAGES, 
    RESET_ALL, 
   
  } from "../actions/CentroEsteticoAction";
  
  // Stato iniziale del reducer
  const initialState = {
    error: {}, // Oggetto per contenere eventuali errori
    result: {}, // Oggetto per memorizzare i risultati delle azioni
   
    form: {
      name: "", // Campo nome nel form
      surname: "", // Campo cognome nel form
      email: "", // Campo email nel form
      password: "",
      nameBeautyCenter:"",
      address: "",
      city: "" ,
      trattamenti:""
    },
  };
  
  // Funzione reducer che gestisce le azioni relative all'utente
  const centroEsteticoReducer = (state = initialState, action) => {
    switch (action.type) {
      // Azione per aggiornare un campo del form
      case SET_FIELD:
        return {
          ...state, // Mantiene il resto dello stato immutato
          form: {
            ...state.form, // Copia lo stato corrente del form
            [action.payload.id]: action.payload.value, // Aggiorna il campo specifico
          },
        };
  
      // Azione per impostare i dati dopo una registrazione
      case SET_REG_BEAUTY_CENTER:
        return {
          ...state, // Mantiene il resto dello stato immutato
          result: action.payload, // Salva il risultato della registrazione
        };
  
      
  
      // Azione per gestire e salvare gli errori
      case SET_ERROR:
        return {
          ...state, // Mantiene il resto dello stato immutato
          error: action.payload, // Salva l'errore ricevuto
        };
  
      // Azione per resettare completamente lo stato del reducer
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
      case RESET_MESSAGES:
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
  