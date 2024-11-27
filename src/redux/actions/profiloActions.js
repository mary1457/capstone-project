

const baseEndpoint = 'http://localhost:3001/user';
export const SET_FIELD = "SET_FIELD";
export const SET_ERROR = 'SET_ERROR';
export const GET_PROFILO = 'GET_PROFILO'; 
export const UPDATE_PROFILO = 'UPDATE_PROFILO';
export const DELETE_PROFILO = 'DELETE_PROFILO';
export const RESET_ALL = "RESET_ALL"; 

export const setField = ({ id, value }) => ({
  type: SET_FIELD,
  payload: { id, value },
});



export const getProfilo = (accessToken) => {
  return async (dispatch) => {
    try {
      const response = await fetch(baseEndpoint + "/me", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const profile = await response.json();
        dispatch({
          type: GET_PROFILO,
          payload: profile,
        });
        return profile;
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


export const updateProfilo = (profileData, accessToken) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseEndpoint}/me`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        dispatch({
          type: UPDATE_PROFILO,
          payload: updatedProfile,
        });
        return updatedProfile;
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


export const deleteProfilo = (accessToken) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseEndpoint}/me`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        dispatch({
          type: DELETE_PROFILO,
        });
        return true;
      } else {
        const error = await response.json();
        dispatch({
          type: SET_ERROR,
          payload: error.message,
        });
        return false;
      }
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: 'Network or server error',
      });
      return false;
    }
  };
};
