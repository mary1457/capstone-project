const baseEndpoint = 'http://localhost:3001/user';

export const SET_FIELD = "SET_FIELD"; 
export const SET_ERROR = "SET_ERROR"; 
export const RESET_ALL = "RESET_ALL"; 
export const SET_RESULT = "SET_RESULT"; 


export const setField = ({ id, value }) => ({
  type: SET_FIELD,
  payload: { id, value },
});


export const resetAll = () => ({
  type: RESET_ALL,
});


export const setResult = (searchResult) => ({
  type: SET_RESULT,
  payload: searchResult,
});


export const ricerca = (searchForm, accessToken) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${baseEndpoint}/search?trattamento=${searchForm.trattamento}&citta=${searchForm.citta}&data=${searchForm.dataPrenotazione}`,
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
        dispatch(setResult(ricerca)); 
        return ricerca;
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
      dispatch({
        type: SET_ERROR,
        payload: { message: 'Problema lato server' },
      });
      return null;
    }
  };
};
