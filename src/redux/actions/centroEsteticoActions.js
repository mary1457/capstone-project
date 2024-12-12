const baseEndpoint = 'https://formidable-jacklin-mary1457-3c45e5ff.koyeb.app/auth';
const baseEndpointUser = 'https://formidable-jacklin-mary1457-3c45e5ff.koyeb.app/user';

export const SET_FIELD_REGISTER_BC = "SET_FIELD_REGISTER_BC"; 
export const SET_ERROR = "SET_ERROR"; 
export const RESET_ALL = "RESET_ALL"; 
export const RESET_ERROR = "RESET_ERROR";
export const REG_CENTRO_ESTETICO = "REG_CENTRO_ESTETICO"; 
export const GET_CLIENTI = "GET_CLIENTI";  


export const setFieldRegisterBc = ({ id, value }) => ({
  type: SET_FIELD_REGISTER_BC,
  payload: { id, value },
});


export const resetAll = () => ({
  type: RESET_ALL,
});


export const resetError = () => ({
  type: RESET_ERROR,
});


export const registrazioneCentroEstetico = (centroEstetico) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseEndpoint}/registerBeautyCenter`, {
        method: 'POST',
        body: JSON.stringify(centroEstetico),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      

      if (response.ok) {
        const centroEsteticoData = await response.json();
        dispatch({
          type: REG_CENTRO_ESTETICO,
          payload: centroEsteticoData,  
        });
      } else {
        const errore = await response.json();
        console.log("API Error:", errore); 
        dispatch({
          type: SET_ERROR,
          payload: errore,  
        });
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      const errore = { message: "Issue on the server side. Please try again later" };
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
      const response = await fetch(`${baseEndpointUser}/clients`, {
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
