import { SET_FIELD_SEARCH, SET_ERROR, RESET_ALL, SET_RESULT } from '../actions/homeActions';
import { LOGOUT } from "../actions/accessTokenActions";
const initialState = {
  searchForm: {
    trattamento: "",
    citta: "",
    dataPrenotazione:""
  },
  searchResult: [], 
  error: {}, 
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FIELD_SEARCH:
      
      return {
        ...state,
        searchForm: {
          ...state.searchForm,
          [action.payload.id]: action.payload.value,
        },
      };

    case SET_RESULT:
     
      return {
        ...state,
        searchResult: action.payload,
        error: {}, 
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

export default homeReducer;
