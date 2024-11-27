export const ACCESS_TOKEN = "ACCESS_TOKEN"; 

export const accessToken = (accessToken, userType) => ({
    type: ACCESS_TOKEN,
    payload: accessToken, userType
  });