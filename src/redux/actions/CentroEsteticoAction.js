
// Definizione delle costanti per i tipi di azioni
export const SET_FIELD = "SET_FIELD"; // Per aggiornare i campi del form
export const SET_REG_BEAUTY_CENTER = "SET_REG_BEAUTY_CENTER"; // Per memorizzare l'utente registrato

export const SET_ERROR = "SET_ERROR"; // Per gestire gli errori
export const RESET_ALL = "RESET_ALL"; // Per resettare tutto lo stato utente
export const RESET_MESSAGES = "RESET_MESSAGES"; // Per resettare i messaggi (es. errori)

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

// Funzione asincrona per registrare un nuovo utente
export const postRegisterBeautyCenter = (centroEstetico) => {
  return async (dispatch, getState) => {
    try {
      // Effettua la richiesta POST per la registrazione
      const response = await fetch(baseEndpoint + "/registerBeautyCenter", {
        method: 'POST',
        body: JSON.stringify(centroEstetico), // Converte i dati dell'utente in JSON
        headers: {
          'Content-Type': 'application/json', // Specifica il tipo di contenuto
        },
      });

      console.log(response); // Debug: stampa la risposta

      if (response.ok) {
        // Se la risposta è positiva, recupera l'utente dal server
        const centroEstetico = await response.json();
        dispatch({
          type: 'SET_REG_BEAUTY_CENTER', // Aggiorna lo stato con l'utente registrato
          payload: centroEstetico,
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





  