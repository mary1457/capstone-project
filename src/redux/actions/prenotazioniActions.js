const baseEndpoint = 'http://localhost:3001/prenotazioni';

export const GET_PRENOTAZIONI = "GET_PRENOTAZIONI"; 
export const DELETE_PRENOTAZIONI = "DELETE_PRENOTAZIONI";


export const getPrenotazioni = (accessToken) => {
    return async (dispatch, getState) => {
      try {
      
        const response = await fetch(
          baseEndpoint + "/me",
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken.accessToken}`, // Usa il token qui
              'Content-Type': 'application/json',
            },
          }
        );
  
        console.log('Response:', response); // Debug: stampa la risposta
  
        if (response.ok) {
          // Recupera i dati del profilo dal server
          const prenotazioni = await response.json();
          dispatch({
            type: 'GET_PRENOTAZIONI', // Tipo dell'azione che indica che il profilo è stato recuperato
            payload: prenotazioni, // I dati del profilo
          });
          return prenotazioni; // Restituisce i dati per ulteriori operazioni
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
  
  
 
  
  export const deletePrenotazioni = (accessToken, id) => {
    return async (dispatch, getState) => {
      try {
        // Effettua una richiesta DELETE per eliminare il profilo
        const response = await fetch(`${baseEndpoint}/${id}`,
          {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${accessToken.accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
  
        console.log('Response:', response); // Debug: stampa la risposta
  
        if (response.ok) {
          // Profilo eliminato con successo
          dispatch({
            type: 'DELETE_PRENOTAZIONI',
            payload: id, // Tipo dell'azione per indicare che il profilo è stato eliminato
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
  