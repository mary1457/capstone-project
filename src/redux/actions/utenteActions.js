export const SET_FIELD = "SET_FIELD"; 
export const SET_ERROR = "SET_ERROR"; 
export const RESET_ALL = "RESET_ALL"; 
export const RESET_ERROR = "RESET_ERROR";
export const LOG_UTENTE = "LOG_UTENTE"; 
export const REG_CLIENT = "REG_CLIENT"; 



 
export const SET_RESULT = "SET_RESULT"; 
export const GET_PROFILE = "GET_PROFILE"; 
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const DELETE_PROFILE = "DELETE_PROFILE";


const baseEndpointAuth = 'http://localhost:3001/auth';
const baseEndpoint = 'http://localhost:3001/utenti';
const baseEndpointFav = 'http://localhost:3001/preferiti';


export const setField = ({ id, value }) => ({
  type: SET_FIELD,
  payload: { id, value }, 
});

export const resetAll = () => ({
  type: RESET_ALL,
});


export const resetError = () => ({
  type: RESET_ERROR,
});

export const postLogin = (utente) => {
  return async (dispatch, getState) => {
     

    try {
      
      const response = await fetch(baseEndpointAuth + "/login", {
        method: 'POST',
        body: JSON.stringify(utente), 
        headers: {
          'Content-Type': 'application/json', 
         
        },
      });


      if (response.ok) {
        
        const utente = await response.json();
        dispatch({
          type: 'LOG_UTENTE', 
          payload: utente,
        });
        return utente; 
      } else {
       
        const errore = await response.json();
        dispatch({
          type: 'SET_ERROR',
          payload: errore,
        });
        return null; 
      }
    } catch (error) {
      
      console.error('Fetch Error:', error);
      const errore = { message: "Problema lato server" }; 
      dispatch({
        type: 'SET_ERROR',
        payload: errore,
      });
      return null; 
    }
  };
};

export const postRegister = (cliente) => {
  return async (dispatch, getState) => {
    try {
     
      const response = await fetch(baseEndpointAuth + "/register", {
        method: 'POST',
        body: JSON.stringify(cliente), 
        headers: {
          'Content-Type': 'application/json', 
        },
      });

      

      if (response.ok) {
       
        const cliente = await response.json();
        dispatch({
          type: 'REG_CLIENT', 
          payload: cliente,
        });
      } else {
        
        const errore = await response.json();
        dispatch({
          type: 'SET_ERROR',
          payload: errore, 
        });
        return null;
      }
    } catch (error) {
     
      console.error('Fetch Error:', error);
      const errore = { message: "Problema lato server" }; 
      dispatch({
        type: 'SET_ERROR',
        payload: errore,
      });
      return null;
    }
  };
};


export const setResult = (resultSearch) => ({
  type: SET_RESULT,
  payload: resultSearch,
});




export const getSearch = (searchForm,accessToken) => {
  return async (dispatch, getState) => {
   

    try {
     
      const response = await fetch(
        `${baseEndpoint}/search?trattamenti=${(searchForm.trattamenti)}&city=${(searchForm.city)}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken.accessToken}`, 
            'Content-Type': 'application/json',
          },
        }
      );

     

      if (response.ok) {
       
        const ricerca = await response.json();
        dispatch({
          type: 'SET_RESULT', 
          payload: ricerca,
        });
        return ricerca; 
      } else {
        
        const errore = await response.json();
        dispatch({
          type: 'SET_ERROR',
          payload: errore.message , 
        });
        return null;
      }
    } catch (error) {
      
      console.error('Fetch Error:', error);
      dispatch({
        type: 'SET_ERROR',
        payload: 'Errore di rete o server non raggiungibile',
      });
      return null;
    }
  };
};

export const getProfile = (accessToken) => {
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


export const updateProfile = (profileData, accessToken) => {
  return async (dispatch, getState) => {
    try {
      // Effettua una richiesta PUT per aggiornare il profilo
      const response = await fetch(
        `${baseEndpoint}/me`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${accessToken.accessToken}`,
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


export const deleteProfile = (accessToken) => {
  return async (dispatch, getState) => {
    try {
      // Effettua una richiesta DELETE per eliminare il profilo
      const response = await fetch(
        `${baseEndpoint}/me`,
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



