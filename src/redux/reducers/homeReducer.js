import { SET_FIELD, SET_ERROR, RESET_ALL, SET_RESULT } from '../actions/homeActions';

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
    case SET_FIELD:
      
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

    default:
      return state;
  }
};

export default homeReducer;
