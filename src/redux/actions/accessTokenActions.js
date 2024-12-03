export const ACCESS_TOKEN = "ACCESS_TOKEN"; 
export const LOGOUT = 'LOGOUT';
export const logout = () => ({
  type: LOGOUT,
});

export const accessToken = (accessToken, userType) => ({
    type: ACCESS_TOKEN,
    payload: {accessToken, userType}
  });


  export const loadAccessTokenFromStorage = () => {
    return (dispatch) => {
    
      const storedAccessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
      const storedUserType = localStorage.getItem("userType") || sessionStorage.getItem("userType");
 
      if (storedAccessToken && storedUserType) {
        
        dispatch(accessToken(storedAccessToken, storedUserType));
      }
    };
  };

  export const clearStorageAndStore = () => {
    return (dispatch) => {
     
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userType');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('userType');
      
      
      dispatch(logout());
    };
  };