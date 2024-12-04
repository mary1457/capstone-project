import { GET_PROFILO, UPDATE_PROFILO, DELETE_PROFILO, SET_ERROR, RESET_ERROR, SET_FIELD, GET_PROFILO_BC } from "../actions/profiloActions";
import { DELETE } from "../actions/accessTokenActions";

const initialState = {

  profileBc: {},
  profile: {
    nome: "",
    cognome: "",
    email: "",
    password: ""
  },
  profileForm: {
    nome: "",
    cognome: "",
    email: "",
  },
  error: {},
};

const profiloReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_FIELD:
      return {
        ...state,
        profileForm: {
          ...state.profileForm, 
          [action.payload.id]: action.payload.value, 
        },
      };

    case GET_PROFILO:
      return {
        ...state,
        profile: action.payload,
        error: {},  
      };

    case UPDATE_PROFILO:
      return {
        ...state,
        profile: action.payload,
        error: {},
      };

    case DELETE_PROFILO:
      return {
        ...state,
        profile: null, 
        error: {},
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

    case GET_PROFILO_BC:
      return {
        ...state,
        profileBc: action.payload,
        error: {},
      };

    default:
      return state;
  }
};

export default profiloReducer;

