const baseEndpointUser = 'http://localhost:3001/user';

export const SET_FIELD_SEARCH = "SET_FIELD_SEARCH"; 
export const SET_ERROR = "SET_ERROR"; 
export const RESET_ALL = "RESET_ALL"; 
export const SET_RESULT = "SET_RESULT"; 


export const setFieldSearch = ({ id, value }) => ({
  type: SET_FIELD_SEARCH,
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
        `${baseEndpointUser}/search?trattamento=${searchForm.trattamento}&citta=${searchForm.citta}&data=${searchForm.dataPrenotazione}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("Response status:", response.status);


      
      if (response.ok) {
        const ricerca = await response.json();
        dispatch(setResult(ricerca));  
        return ricerca;
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