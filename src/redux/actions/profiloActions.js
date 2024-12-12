const baseEndpoint = 'http://formidable-jacklin-mary1457-3c45e5ff.koyeb.app/user';

export const SET_FIELD = "SET_FIELD";
export const SET_ERROR = 'SET_ERROR';
export const GET_PROFILO = 'GET_PROFILO'; 
export const UPDATE_PROFILO = 'UPDATE_PROFILO';
export const DELETE_PROFILO = 'DELETE_PROFILO';
export const RESET_ERROR = "RESET_ERROR";
export const GET_PROFILO_BC = 'GET_PROFILO_BC';

export const setField = ({ id, value }) => ({
  type: SET_FIELD,
  payload: { id, value },
});

export const resetError = () => ({
  type: RESET_ERROR,
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
      const errore = { message: "Issue on the server side. Please try again later" };
      dispatch({
        type: SET_ERROR,
        payload: errore,
      });
      return false;
    }
  };
};

export const getProfiloBC = (accessToken) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseEndpoint}/bc`, { 
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

     
      if (response.ok) {
        const profileBc = await response.json();
      
        
        dispatch({
          type: GET_PROFILO_BC,
          payload: profileBc,
        });

        return profileBc;
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

