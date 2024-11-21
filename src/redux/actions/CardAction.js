// actions.js

export const ADD_TO_FAVORITE = 'ADD_TO_FAVORITE';
export const REMOVE_FROM_FAVORITE = 'REMOVE_FROM_FAVORITE';
export const GET_PREFERITI = "GET_PREFERITI"; 
const baseEndpoint2 = 'http://localhost:3001/preferiti';

// Aggiungi un centro ai preferiti
export const addToFavorite = (center) => ({
  type: ADD_TO_FAVORITE,
  payload: center,  // Qui invii il centro estetico (o solo il suo ID se vuoi risparmiare memoria)
});

// Rimuovi un centro dai preferiti
export const removeFromFavorite = (center) => ({
  type: REMOVE_FROM_FAVORITE,
  payload: center,  // Come sopra, puoi inviare solo l'ID del centro
});

export const postPreferiti = (token, item) => {
    return async (dispatch, getState) => {
      try {
        // Effettua una richiesta PUT per aggiornare il profilo
        const response = await fetch(
          baseEndpoint2,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token.accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item), // Dati del profilo da aggiornare
          }
        );
  
        console.log('Response:', response); // Debug: stampa la risposta
  
        if (response.ok) {
          // Recupera i dati aggiornati del profilo dal server
          const favorites = await response.json();
          dispatch(addToFavorite(favorites));
        
          return favorites; // Restituisce i dati aggiornati per ulteriori operazioni
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
  
  
  export const deletePreferiti = (token, item) => {
    return async (dispatch, getState) => {
        let id = "";
        if (typeof item.favId === 'undefined') {id= item.id}
        else {id = item.favId}
      try {
        // Effettua una richiesta DELETE per eliminare il profilo
        const response = await fetch(
          baseEndpoint2+ "/" + id,
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
          dispatch(
            removeFromFavorite(item) // Tipo dell'azione per indicare che il profilo è stato eliminato
          );
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
