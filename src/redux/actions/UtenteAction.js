// Importazioni devono essere all'inizio del file


// Definizione delle costanti per i tipi di azioni
export const SET_FIELD = "SET_FIELD"; // Per aggiornare i campi del form
export const SET_REG = "SET_REG"; // Per memorizzare l'utente registrato
export const SET_LOG = "SET_LOG"; // Per memorizzare l'utente loggato
export const SET_ERROR = "SET_ERROR"; // Per gestire gli errori
export const RESET_ALL = "RESET_ALL"; // Per resettare tutto lo stato utente
export const RESET_MESSAGES = "RESET_MESSAGES"; // Per resettare i messaggi (es. errori o successi)

// Creazione del custom hook per ottenere il token


// Azione per aggiornare un campo del form
export const setField = ({ id, value }) => ({
  type: SET_FIELD,
  payload: { id, value }, // Passa l'id del campo e il nuovo valore
});

// Azione per resettare tutto lo stato utente
export const resetAll = () => ({
  type: RESET_ALL,
});

// Azione per resettare i messaggi (errori o successi)
export const resetMessages = () => ({
  type: RESET_MESSAGES,
});

// Endpoint di base per le richieste di autenticazione
const baseEndpoint = 'http://localhost:3001/auth';
const baseEndpoint1 = 'http://localhost:3001/utenti';

// Funzione asincrona per registrare un nuovo utente
export const postRegister = (utente) => {
  return async (dispatch, getState) => {
    try {
      // Effettua la richiesta POST per la registrazione
      const response = await fetch(baseEndpoint + "/register", {
        method: 'POST',
        body: JSON.stringify(utente), // Converte i dati dell'utente in JSON
        headers: {
          'Content-Type': 'application/json', // Specifica il tipo di contenuto
        },
      });

      console.log(response); // Debug: stampa la risposta

      if (response.ok) {
        // Se la risposta è positiva, recupera l'utente dal server
        const utente = await response.json();
        dispatch({
          type: 'SET_REG', // Aggiorna lo stato con l'utente registrato
          payload: utente,
        });
      } else {
        // Se ci sono errori, li recupera e li invia a Redux
        const errore = await response.json();
        dispatch({
          type: 'SET_ERROR',
          payload: errore, // Messaggio di errore dal server
        });
      }
    } catch (error) {
      // Gestisce eventuali errori della fetch
      console.error('Fetch Error:', error);
      const errore = { message: "Problema lato server" }; // Messaggio di fallback
      dispatch({
        type: 'SET_ERROR',
        payload: errore,
      });
    }
  };
};

// Funzione asincrona per loggare un utente
export const postLogin = (utente) => {
  return async (dispatch, getState) => {
     // Usa il custom hook qui

    try {
      // Effettua la richiesta POST per il login
      const response = await fetch(baseEndpoint + "/login", {
        method: 'POST',
        body: JSON.stringify(utente), // Converte i dati dell'utente in JSON
        headers: {
          'Content-Type': 'application/json', // Specifica il tipo di contenuto
         
        },
      });

      console.log(response); // Debug: stampa la risposta

      if (response.ok) {
        // Se la risposta è positiva, recupera l'utente dal server
        const utente = await response.json();
        dispatch({
          type: 'SET_LOG', // Aggiorna lo stato con l'utente loggato
          payload: utente,
        });
        return utente; // Restituisce l'utente per ulteriori operazioni
      } else {
        // Se ci sono errori, li recupera e li invia a Redux
        const errore = await response.json();
        dispatch({
          type: 'SET_ERROR',
          payload: errore, // Messaggio di errore dal server
        });
        return null; // Restituisce null in caso di errore
      }
    } catch (error) {
      // Gestisce eventuali errori della fetch
      console.error('Fetch Error:', error);
      return null; // Restituisce null in caso di eccezione
    }
  };
};

// Funzione asincrona per cercare i trattamenti
export const getSearch = (searchForm,token) => {
  return async (dispatch, getState) => {
    // Usa il custom hook qui

    try {
      // Effettua una richiesta GET per cercare centri estetici
      const response = await fetch(
        `${baseEndpoint1}/search?trattamenti=${(searchForm.trattamenti)}&city=${(searchForm.city)}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token.accessToken}`, // Usa il token qui
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response:', response); // Debug: stampa la risposta

      if (response.ok) {
        // Recupera i dati dei centri estetici dal server
        const centroEstetico = await response.json();
        dispatch({
          type: 'SET_LOG', // Aggiorna lo stato con i dati ricevuti
          payload: centroEstetico,
        });
        return centroEstetico; // Restituisce i dati per ulteriori operazioni
      } else {
        // Recupera e gestisce gli errori della risposta
        const errore = await response.json();
        dispatch({
          type: 'SET_ERROR',
          payload: errore.message , // Messaggio predefinito
        });
        return null;
      }
    } catch (error) {
      // Gestisce errori di rete o eccezioni nella fetch
      console.error('Fetch Error:', error);
      dispatch({
        type: 'SET_ERROR',
        payload: 'Errore di rete o server non raggiungibile',
      });
      return null;
    }
  };
};
