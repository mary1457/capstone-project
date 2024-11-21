// Importazioni devono essere all'inizio del file


// Definizione delle costanti per i tipi di azioni
export const SET_FIELD = "SET_FIELD"; // Per aggiornare i campi del form
export const SET_REG = "SET_REG"; // Per memorizzare l'utente registrato
export const SET_LOG = "SET_LOG"; // Per memorizzare l'utente loggato
export const SET_ERROR = "SET_ERROR"; // Per gestire gli errori
export const RESET_ALL = "RESET_ALL"; // Per resettare tutto lo stato utente
export const RESET_MESSAGES = "RESET_MESSAGES"; // Per resettare i messaggi (es. errori o successi)
export const SET_RESULT = "SET_RESULT"; // Per resettare i messaggi (es. errori o successi)
export const GET_PROFILE = "GET_PROFILE"; 
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const DELETE_PROFILE = "DELETE_PROFILE";// Per resettare i messaggi (es. errori o successi)
// Creazione del custom hook per ottenere il token
export const ADD_PROPERTY = "ADD_PROPERTY";


export const setProperty = (resultfav  ) => ({
  type: ADD_PROPERTY,
  payload: resultfav // Passa l'id del campo e il nuovo valore
});
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

export const setResult = (resultSearch) => ({
  type: SET_RESULT,
  payload: resultSearch,
});

// Endpoint di base per le richieste di autenticazione
const baseEndpoint = 'http://localhost:3001/auth';
const baseEndpoint1 = 'http://localhost:3001/utenti';
const baseEndpoint2 = 'http://localhost:3001/preferiti';

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
          type: 'SET_RESULT', // Aggiorna lo stato con i dati ricevuti
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

export const getProfile = (token) => {
  return async (dispatch, getState) => {
    try {
      // Effettua una richiesta GET per ottenere i dettagli del profilo
      const response = await fetch(
        baseEndpoint1 + "/me",
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
        // Recupera i dati del profilo dal server
        const profile = await response.json();
        dispatch({
          type: 'GET_PROFILE', // Tipo dell'azione che indica che il profilo è stato recuperato
          payload: profile, // I dati del profilo
        });
        return profile; // Restituisce i dati per ulteriori operazioni
      } else {
        // Gestione dell'errore nella risposta
        const error = await response.json();
        dispatch({
          type: 'SET_ERROR',
          payload: error.message, // Messaggio d'errore restituito dal server
        });
        return null; // Restituisce null in caso di errore
      }
    } catch (error) {
      // Gestisce errori di rete o server
      console.error('Fetch Error:', error);
      dispatch({
        type: 'SET_ERROR',
        payload: 'Errore di rete o server non raggiungibile', // Messaggio di errore di rete
      });
      return null;
    }
  };
};


export const updateProfile = (profileData, token) => {
  return async (dispatch, getState) => {
    try {
      // Effettua una richiesta PUT per aggiornare il profilo
      const response = await fetch(
        `${baseEndpoint1}/me`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(profileData), // Dati del profilo da aggiornare
        }
      );

      console.log('Response:', response); // Debug: stampa la risposta

      if (response.ok) {
        // Recupera i dati aggiornati del profilo dal server
        const updatedProfile = await response.json();
        dispatch({
          type: 'UPDATE_PROFILE', // Tipo dell'azione che indica che il profilo è stato aggiornato
          payload: updatedProfile,
        });
        return updatedProfile; // Restituisce i dati aggiornati per ulteriori operazioni
      } else {
        // Gestione dell'errore dalla risposta
        const error = await response.json();
        dispatch({
          type: 'SET_ERROR',
          payload: error.message, // Messaggio d'errore restituito dal server
        });
        return null;
      }
    } catch (error) {
      // Gestione di errori di rete o server
      console.error('Fetch Error:', error);
      dispatch({
        type: 'SET_ERROR',
        payload: 'Errore di rete o server non raggiungibile',
      });
      return null;
    }
  };
};


export const deleteProfile = (token) => {
  return async (dispatch, getState) => {
    try {
      // Effettua una richiesta DELETE per eliminare il profilo
      const response = await fetch(
        `${baseEndpoint1}/me`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response:', response); // Debug: stampa la risposta

      if (response.ok) {
        // Profilo eliminato con successo
        dispatch({
          type: 'DELETE_PROFILE', // Tipo dell'azione per indicare che il profilo è stato eliminato
        });
        return true; // Restituisce true per indicare che l'eliminazione è riuscita
      } else {
        // Gestione dell'errore dalla risposta
        const error = await response.json();
        dispatch({
          type: 'SET_ERROR',
          payload: error.message, // Messaggio d'errore restituito dal server
        });
        return false;
      }
    } catch (error) {
      // Gestione di errori di rete o server
      console.error('Fetch Error:', error);
      dispatch({
        type: 'SET_ERROR',
        payload: 'Errore di rete o server non raggiungibile',
      });
      return false;
    }
  };
};

export const getPreferiti = (token) => {
  return async (dispatch, getState) => {
    try {
      // Effettua una richiesta GET per ottenere i dettagli del profilo
      const response = await fetch(
        baseEndpoint2 + "/me",
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
        // Recupera i dati del profilo dal server
        const favorites = await response.json();
        dispatch({
          type: 'GET_PREFERITI', // Tipo dell'azione che indica che il profilo è stato recuperato
          payload: favorites, // I dati del profilo
        });
        return favorites; // Restituisce i dati per ulteriori operazioni
      } else {
        // Gestione dell'errore nella risposta
        const error = await response.json();
        dispatch({
          type: 'SET_ERROR',
          payload: error.message, // Messaggio d'errore restituito dal server
        });
        return null; // Restituisce null in caso di errore
      }
    } catch (error) {
      // Gestisce errori di rete o server
      console.error('Fetch Error:', error);
      dispatch({
        type: 'SET_ERROR',
        payload: 'Errore di rete o server non raggiungibile', // Messaggio di errore di rete
      });
      return null;
    }
  };
};


