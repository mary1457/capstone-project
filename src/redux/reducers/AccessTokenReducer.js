import { ACCESS_TOKEN} from "../actions/accessTokenActions";
import { DELETE } from "../actions/accessTokenActions";
const initialState = {
   accessToken: null,
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

            case DELETE:
              return initialState;
  
      default:
        return state;
    }
  };
  
  export default accessTokenReducer;

