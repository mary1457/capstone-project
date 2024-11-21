// Importazione dei tipi di azioni definiti nelle action
import { 
  SET_FIELD, 
  SET_REG, 
  SET_ERROR, 
  RESET_MESSAGES, 
  RESET_ALL, 
  SET_LOG ,
  SET_RESULT,
  GET_PROFILE,
  UPDATE_PROFILE,
  DELETE_PROFILE,
  ADD_PROPERTY
} from "../actions/UtenteAction";

// Stato iniziale del reducer
const initialState = {
  profile: {name:""},
  error: {}, // Oggetto per contenere eventuali errori
  result: {}, // Oggetto per memorizzare i risultati delle azioni
  resultSearch: [], 
  utente: null, // Dati dell'utente loggato (null se non loggato)
  form: {
    name: "", // Campo nome nel form
    surname: "", // Campo cognome nel form
    email: "", // Campo email nel form
    password: "", // Campo password nel form
  },
  searchForm: {trattamenti:"",
    city:""
  }
};

// Funzione reducer che gestisce le azioni relative all'utente
const utenteReducer = (state = initialState, action) => {
  switch (action.type) {
    // Azione per aggiornare un campo del form
    case SET_FIELD:
      return {
        ...state, // Mantiene il resto dello stato immutato
        form: {
          ...state.form, // Copia lo stato corrente del form
          [action.payload.id]: action.payload.value, // Aggiorna il campo specifico
        },

        searchForm: {
          ...state.searchForm, // Copia lo stato corrente del form
          [action.payload.id]: action.payload.value, // Aggiorna il campo specifico
        },
      };

    // Azione per impostare i dati dopo una registrazione
    case SET_REG:
      return {
        ...state, // Mantiene il resto dello stato immutato
        result: action.payload, // Salva il risultato della registrazione
      };

      case SET_RESULT:
      return {
        ...state, // Mantiene il resto dello stato immutato
        resultSearch: action.payload, // Salva il risultato della registrazione
      };

    // Azione per impostare i dati dell'utente loggato
    case SET_LOG:
      return {
        ...state, // Mantiene il resto dello stato immutato
        utente: action.payload, // Salva i dati dell'utente loggato
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
          password: "", // Resetta il campo password
        },
        utente: null, // Resetta i dati dell'utente loggato
      };

    // Azione per resettare solo i messaggi di errore o successo
    case RESET_MESSAGES:
      return {
        ...state, // Mantiene il resto dello stato immutato
        result: {}, // Resetta i risultati
        error: {}, // Resetta gli errori
      };


      case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };


    case UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };


    case DELETE_PROFILE:
      return {
        ...state,
        profile: null, // Il profilo è stato eliminato, quindi lo mettiamo a null
      };


      case ADD_PROPERTY: {
        const { index, newProperty, value } = action.payload;
  
        // Crea un nuovo array di oggetti
        const updatedItems = state.resultSearch.map((item, i) =>
          i === index 
            ? { ...item, [newProperty]: value } // Aggiungi la nuova proprietà
            : item
        );
  
        // Restituisci il nuovo stato
        return {
          ...state,
          resultSearch: updatedItems
        };
      }

    // Azione di default: ritorna lo stato attuale senza modificarlo
    default:
      return state;
  }
};







// Esportazione del reducer come default
export default utenteReducer;
