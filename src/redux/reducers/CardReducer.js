import { 
  ADD_TO_FAVORITES, 
  REMOVE_FROM_FAVORITES, 
  GET_PREFERITI, 

} from "../actions/cardActions";

const initialState = {
  favorites: [], // Stato iniziale per i preferiti
 
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
   
    case GET_PREFERITI:
      return {
        ...state,
        favorites: action.payload,
      };

    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload], // Aggiunge il nuovo elemento
      };

    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter((item) => item.id !== action.payload), // Rimuove per ID
      };


    default:
      return state;
  }
};

export default cardReducer;
