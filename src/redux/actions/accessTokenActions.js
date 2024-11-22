export const ACCESS_TOKEN = "ACCESS_TOKEN"; 

export const accessToken = (accessToken) => ({
    type: ACCESS_TOKEN,
    payload: accessToken,
  });