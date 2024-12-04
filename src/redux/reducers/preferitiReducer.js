import { ADD_PREFERITI, REMOVE_PREFERITI, GET_PREFERITI, SET_ERROR, RESET_ERROR } from "../actions/preferitiActions";
import { DELETE } from "../actions/accessTokenActions";

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
        error: action.payload || { message: "An unknown error occurred" },
      };

    case RESET_ERROR:
      return {
        ...state,
        error: {},
      };

    case DELETE:
      return initialState;

    default:
      return state;
  }
};

export default preferitiReducer;
