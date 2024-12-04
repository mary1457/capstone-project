export const ACCESS_TOKEN = "ACCESS_TOKEN"; 
export const DELETE = 'DELETE';


export const deleteAction = () => ({
  type: DELETE,
});

export const accessToken = (accessToken, userType) => ({
    type: ACCESS_TOKEN,
    payload: { accessToken, userType }
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
    
    dispatch(deleteAction()); 
  };
};
