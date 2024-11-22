import { ACCESS_TOKEN} from "../actions/accessTokenActions";

const initialState = {
   accessToken: {}
  };

  const accessTokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACCESS_TOKEN:
            return {
              ...state, 
              accessToken: action.payload, 
            };
  
      default:
        return state;
    }
  };
  
  export default accessTokenReducer;
  

