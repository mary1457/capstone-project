import { ADD_PREFERITI, REMOVE_PREFERITI, GET_PREFERITI , SET_ERROR, RESET_ALL} from "../actions/preferitiActions";
import { LOGOUT } from "../actions/accessTokenActions";
const initialState = {
  preferiti: [], 
  error: {}, 
};

const preferitiReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_PREFERITI:
      return {
        ...state,
        preferiti: action.payload, 
        error: {}

      };

    case ADD_PREFERITI:
     
      return {
        ...state,
        preferiti: [...state.preferiti, action.payload], 
        error: {}
      };

    case REMOVE_PREFERITI:
     
      return {
        ...state,
        preferiti: state.preferiti.filter((item) => item.id !== action.payload), 
        error: {}
      };


      case SET_ERROR:
     
      return {
        ...state,
        error: action.payload,
      };

    case RESET_ALL:
      
      return {
        ...state,
        error: {},
      };

      case LOGOUT:
        return initialState;

    default:
      return state;
  }
};

export default preferitiReducer;
