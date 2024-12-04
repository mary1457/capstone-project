const baseEndpoint = 'http://localhost:3001/auth';

export const SET_FIELD_LOGIN = "SET_FIELD_LOGIN";
export const SET_ERROR = "SET_ERROR";
export const RESET_ALL = "RESET_ALL";
export const RESET_ERROR = "RESET_ERROR";
export const LOG_UTENTE = "LOG_UTENTE";

export const setFieldLogin = ({ id, value }) => ({
  type: SET_FIELD_LOGIN,
  payload: { id, value },
});

export const resetAll = () => ({
  type: RESET_ALL,
});

export const resetError = () => ({
  type: RESET_ERROR,
});

export const login = (utente) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseEndpoint}/login`, {
        method: 'POST',
        body: JSON.stringify(utente),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("Response status:", response.status);

      if (response.ok) {
        const userData = await response.json();
        dispatch({
          type: LOG_UTENTE,
          payload: userData,
        });
        return userData;
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
      const errore = { message: "Issue on the server side. Please try again later" };
      dispatch({
        type: SET_ERROR,
        payload: errore,
      });
      return null;
    }
  };
};