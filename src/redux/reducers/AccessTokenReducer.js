import { ACCESS_TOKEN} from "../actions/accessTokenActions";

const initialState = {
   accessToken: {},
   userType: null,
  };

  const accessTokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACCESS_TOKEN:
            return {
              ...state, 
              accessToken: action.payload.accessToken, 
              userType: action.payload.userType,
            };
  
      default:
        return state;
    }
  };
  
  export default accessTokenReducer;
  

