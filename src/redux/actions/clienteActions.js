const baseEndpoint = 'http://localhost:3001/auth'; 

export const SET_FIELD_REGISTER = "SET_FIELD_REGISTER"; 
export const SET_ERROR = "SET_ERROR"; 
export const RESET_ALL = "RESET_ALL"; 
export const RESET_ERROR = "RESET_ERROR"; 
export const REG_CLIENTE = "REG_CLIENTE"; 

export const setFieldRegister = ({ id, value }) => ({
  type: SET_FIELD_REGISTER,
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
      const response = await fetch(`${baseEndpoint}/register`, {
        method: 'POST',
        body: JSON.stringify(cliente),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        const clienteRegistrato = await response.json();
        dispatch({
          type: REG_CLIENTE,
          payload: clienteRegistrato,
        });
        return clienteRegistrato;
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
      const errore = { message: "Issue on the server side. Please try again later" };
      dispatch({
        type: SET_ERROR,
        payload: errore,
      });
      return null;
    }
  };
};
