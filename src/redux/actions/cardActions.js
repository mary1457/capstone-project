export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const SET_ERROR = 'SET_ERROR';
export const GET_PREFERITI = 'GET_PREFERITI';

const baseEndpointFav = 'http://localhost:3001/preferiti';

/**
 * Ottieni i preferiti dal server.
 */
export const getPreferiti = (accessToken) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseEndpointFav}/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken.accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const favorites = await response.json();
        dispatch({
          type: GET_PREFERITI,
          payload: favorites,
        });
        return favorites;
      } else {
        const error = await response.json();
        dispatch({
          type: SET_ERROR,
          payload: error.message,
        });
        return null;
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      dispatch({
        type: SET_ERROR,
        payload: 'Errore di rete o server non raggiungibile',
      });
      return null;
    }
  };
};

/**
 * Aggiungi un elemento ai preferiti.
 */
export const addToFavorites = (accessToken, item) => {
  const request ={nameBeautyCenter: item.nameBeautyCenter,
address:item.address,
centroEsteticoId: item.id}
  return async (dispatch) => {
    try {
      const response = await fetch(baseEndpointFav, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (response.ok) {
        const newFavorite = await response.json();
        dispatch({
          type: ADD_TO_FAVORITES,
          payload: newFavorite,
        });
        return newFavorite;
      } else {
        const error = await response.json();
        dispatch({
          type: SET_ERROR,
          payload: error.message,
        });
        return null;
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      dispatch({
        type: SET_ERROR,
        payload: 'Errore di rete o server non raggiungibile',
      });
      return null;
    }
  };
};

/**
 * Rimuovi un elemento dai preferiti.
 */
export const removeFromFavorites = (accessToken, id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseEndpointFav}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken.accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        dispatch({
          type: REMOVE_FROM_FAVORITES,
          payload: id,
        });
        return true;
      } else {
        const error = await response.json();
        dispatch({
          type: SET_ERROR,
          payload: error.message,
        });
        return false;
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      dispatch({
        type: SET_ERROR,
        payload: 'Errore di rete o server non raggiungibile',
      });
      return false;
    }
  };
};
