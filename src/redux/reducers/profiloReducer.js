import { GET_PROFILO, UPDATE_PROFILO, DELETE_PROFILO, SET_ERROR, RESET_ALL, SET_FIELD } from "../actions/profiloActions";

const initialState = {
  profile: {
    nome: "",
    cognome: "",
    email: "",
    password:""
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
       
      };

    case UPDATE_PROFILO:
      return {
        ...state,
        profile: action.payload,
       
      };

    case DELETE_PROFILO:
      return {
        ...state,
        profile: null, 
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

export default profiloReducer;
