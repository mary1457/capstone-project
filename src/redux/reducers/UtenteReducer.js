
import {
  SET_FIELD,
  SET_ERROR,
  RESET_ALL,
  RESET_ERROR,
  LOG_UTENTE,
  REG_CLIENT,
  SET_RESULT,
  GET_PROFILE,
  UPDATE_PROFILE,
  DELETE_PROFILE,

 
} from "../actions/utenteActions";


const initialState = {
  form: {
    name: "",
    surname: "",
    email: "",
    password: "",
  },
  error: {},
  utente: null,


  profile: { name: "",
    surname: "",
    email: "",
  
   },
 
  result: {}, 
  resultSearch: [],
 

  searchForm: {
    trattamenti: "",
    city: ""
  },
  profileform: {
    name: "",
    surname: "",
    email: "",
  },
};


const utenteReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_FIELD:
      return {
        ...state,
        form: {
          ...state.form,
          [action.payload.id]: action.payload.value,
        },

        searchForm: {
          ...state.searchForm, 
          [action.payload.id]: action.payload.value, 
        },

        profileform: {
          ...state.profileform, 
          [action.payload.id]: action.payload.value, 
        },
      };

    case SET_ERROR:
      return {
        ...state, 
        error: action.payload, 
      };

    case RESET_ALL:
      return {
        ...state,

        form: {
          name: "",
          surname: "",
          email: "",
          password: "",
        },
        error: {},
        utente: null,
        result: {}, 
      
      



      };

    case RESET_ERROR:
      return {
        ...state,

        error: {},
        result: {},
      };


    case LOG_UTENTE:
      return {
        ...state, 
        utente: action.payload, 
      };
   
    case REG_CLIENT:
      return {
        ...state, 
        result: action.payload, 
      };

    case SET_RESULT:
      return {
        ...state, 
        resultSearch: action.payload, 
      };

   


    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };


    case UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };


    case DELETE_PROFILE:
      return {
        ...state,
        profile: null, 
      };


    

    
    default:
      return state;
  }
};






export default utenteReducer;
