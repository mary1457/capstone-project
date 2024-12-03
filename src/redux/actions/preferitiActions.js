const baseEndpointFav = 'http://localhost:3001/fav';

export const ADD_PREFERITI = 'ADD_PREFERITI';
export const REMOVE_PREFERITI = 'REMOVE_PREFERITI';
export const SET_ERROR = 'SET_ERROR';
export const GET_PREFERITI = 'GET_PREFERITI';
export const RESET_ALL = "RESET_ALL"; 

export const resetAll = () => ({
  type: RESET_ALL,
});

export const getPreferiti = (accessToken) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseEndpointFav}/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log("Response status:", response.status);

      if (response.ok) {
        const preferiti = await response.json();
        dispatch({
          type: GET_PREFERITI,
          payload: preferiti, 
        });
        return preferiti;
      } else {
        const errore = await response.json();
        console.log("API Error:", errore); 
        dispatch({
          type: SET_ERROR,
          payload: errore,  
        });
        return null;
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      const errore = { message: "Issue on the server side" };
      dispatch({
        type: SET_ERROR,
        payload: errore,
      });

      return null;
    }
  };
};


export const postPreferiti = (accessToken, item) => {
  const request = {
    centroEsteticoId: item.id, 
  };
  
  return async (dispatch) => {
    try {
      const response = await fetch(baseEndpointFav, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });
      console.log("Response status:", response.status);
      if (response.ok) {
        const preferiti = await response.json();
        dispatch({
          type: ADD_PREFERITI,
          payload: preferiti, 
        });
        return preferiti;
      } else {
        const errore = await response.json();
        console.log("API Error:", errore); 
        dispatch({
          type: SET_ERROR,
          payload: errore,  
        });
        return null;
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      const errore = { message: "Issue on the server side" };
      dispatch({
        type: SET_ERROR,
        payload: errore,
      });

      return null;
    }
  };
};


export const deletePreferiti = (accessToken, id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseEndpointFav}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log("Response status:", response.status);

      if (response.ok) {
        dispatch({
          type: REMOVE_PREFERITI,
          payload: id, 
        });
        return true;
      } else {
        const errore = await response.json();
        console.log("API Error:", errore); 
        dispatch({
          type: SET_ERROR,
          payload: errore,  
        });
        return false;
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      const errore = { message: "Issue on the server side" };
      dispatch({
        type: SET_ERROR,
        payload: errore,
      });

      return false;
    }
  };
};
