export const SET_FIELD = "SET_FIELD"; 
export const SET_ERROR = "SET_ERROR"; 
export const RESET_ALL = "RESET_ALL"; 
export const RESET_ERROR = "RESET_ERROR";
export const REG_BEAUTY_CENTER = "REG_BEAUTY_CENTER"; 


const baseEndpoint = 'http://localhost:3001/auth';




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

export const postRegisterBeautyCenter = (centroEstetico) => {
  return async (dispatch, getState) => {
    try {
      
      const response = await fetch(baseEndpoint + "/registerBeautyCenter", {
        method: 'POST',
        body: JSON.stringify(centroEstetico), 
        headers: {
          'Content-Type': 'application/json', 
        },
      });

      

      if (response.ok) {
      
        const centroEstetico = await response.json();
        dispatch({
          type: 'REG_BEAUTY_CENTER',
          payload: centroEstetico,
        });
      } else {
        
        const errore = await response.json();
        dispatch({
          type: 'SET_ERROR',
          payload: errore, 
        });
      }
    } catch (error) {
      
      console.error('Fetch Error:', error);
      const errore = { message: "Problema lato server" }; 
      dispatch({
        type: 'SET_ERROR',
        payload: errore,
      });
    }
  };
};





  