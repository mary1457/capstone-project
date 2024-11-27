const baseEndpoint = 'http://localhost:3001/auth';
const baseEndpoint1 = 'http://localhost:3001/user';


export const SET_FIELD = "SET_FIELD"; 
export const SET_ERROR = "SET_ERROR"; 
export const RESET_ALL = "RESET_ALL"; 
export const RESET_ERROR = "RESET_ERROR";
export const REG_CENTRO_ESTETICO = "REG_CENTRO_ESTETICO"; 
export const GET_CLIENTI = "GET_CLIENTI"; 


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


export const registrazioneCentroEstetico = (centroEstetico) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(baseEndpoint + "/registerBeautyCenter", {
        method: 'POST',
        body: JSON.stringify(centroEstetico), 
        headers: {
          'Content-Type': 'application/json', 
        },
      });

      console.log("Response:", response); 

      if (response.ok) {
        const centroEstetico = await response.json();
        dispatch({
          type: REG_CENTRO_ESTETICO,  
          payload: centroEstetico,
        });
      } else {
        const errore = await response.json();
        dispatch({
          type: SET_ERROR,
          payload: errore, 
        });
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      const errore = { message: "Issue on the server side" }; 
      dispatch({
        type: SET_ERROR,
        payload: errore,
      });
    }
  };
};



export const getClienti = (accessToken) => {
  return async (dispatch) => {
    try {
      const response = await fetch(baseEndpoint1 + "/client", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const clienti = await response.json();
        dispatch({
          type: GET_CLIENTI,
          payload: clienti,
        });
        return clienti;
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