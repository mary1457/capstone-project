const baseEndpoint = 'http://localhost:3001/auth'; 


export const SET_FIELD = "SET_FIELD"; 
export const SET_ERROR = "SET_ERROR"; 
export const RESET_ALL = "RESET_ALL"; 
export const RESET_ERROR = "RESET_ERROR"; 
export const REG_CLIENTE = "REG_CLIENTE"; 


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


export const registrazioneCliente = (cliente) => {
  return async (dispatch) => {
    try {
      const response = await fetch(baseEndpoint + "/register", {
        method: 'POST',
        body: JSON.stringify(cliente),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log("Response:", response);

      if (response.ok) {
        const clienteRegistrato = await response.json();
        dispatch({
          type: REG_CLIENTE,
          payload: clienteRegistrato,
        });
      } else {
        const errore = await response.json();
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
