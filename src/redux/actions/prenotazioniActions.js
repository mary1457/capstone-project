const baseEndpoint = 'http://localhost:3001/res';

export const GET_PRENOTAZIONI = "GET_PRENOTAZIONI"; 
export const GET_TODAY = "GET_TODAY"; 
export const GET_MONTH = "GET_MONTH"; 
export const DELETE_PRENOTAZIONI = "DELETE_PRENOTAZIONI";
export const SET_ERROR = 'SET_ERROR';
export const ADD_PRENOTAZIONI = 'ADD_PRENOTAZIONI';


export const RESET_ALL = "RESET_ALL"; 

export const resetAll = () => ({
  type: RESET_ALL,
});

export const getPrenotazioni = (accessToken) => {
  return async (dispatch) => {
    try {
      const response = await fetch(baseEndpoint + "/me", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log("Response status:", response.status);

      if (response.ok) {
        const prenotazioni = await response.json();
        dispatch({
          type: GET_PRENOTAZIONI,
          payload: prenotazioni,
        });
        return prenotazioni; 
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

export const postPrenotazioni = (accessToken, item, data) => {
  const request = {
    centroEsteticoId: item, data: data
  };
  
  return async (dispatch) => {
    try {
      const response = await fetch(baseEndpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });
      console.log("Response status:", response.status);

      if (response.ok) {
        const prenotazione = await response.json();
        dispatch({
          type: ADD_PRENOTAZIONI,
          payload: prenotazione, 
        });
        return prenotazione;
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


export const deletePrenotazioni = (accessToken, id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseEndpoint}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log("Response status:", response.status);

      if (response.ok) {
        dispatch({
          type: DELETE_PRENOTAZIONI,
          payload: id,
        });
        return true;
      }else {
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


export const getToday = (accessToken) => {
  return async (dispatch) => {
    try {
      const response = await fetch(baseEndpoint + "/today", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const today = await response.json();
        dispatch({
          type: GET_TODAY,
          payload: today,
        });
        return today;
      } else {
        const error = await response.json();
        dispatch({
          type: SET_ERROR,
          payload: error.message,
        });
       
        return null;
      }
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: 'Network or server error',
      });
      
      return null;
    }
  };
};


export const getMonth = (accessToken) => {
  return async (dispatch) => {
    try {
      const response = await fetch(baseEndpoint + "/month", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const month = await response.json();
        dispatch({
          type: GET_MONTH,
          payload: month,
        });
        return month;
      } else {
        const error = await response.json();
        dispatch({
          type: SET_ERROR,
          payload: error.message,
        });
       
        return null;
      }
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: 'Network or server error',
      });
      
      return null;
    }
  };
};