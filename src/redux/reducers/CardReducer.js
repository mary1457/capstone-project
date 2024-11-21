// reducer.js

import { ADD_TO_FAVORITE, REMOVE_FROM_FAVORITE , GET_PREFERITI} from "../actions/CardAction";


const initialState = {
  favorites: [], // Stato iniziale: array vuoto per i preferiti
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITE:
      // Aggiungi il centro ai preferiti se non è già presente
      return {
        ...state,
        favorites: [...state.favorites, action.payload], // Aggiungi l'elemento (o solo l'ID) ai preferiti
      };

    case REMOVE_FROM_FAVORITE:
      // Rimuovi il centro dai preferiti
      return {
        ...state,
        favorites: state.favorites.filter((center) => center.id !== action.payload.id), // Rimuovi il centro con l'ID specificato
      };

      case GET_PREFERITI:
      return {
        ...state,
        favorites: action.payload,
      };

    default:
      return state;
  }
};

export default cardReducer;
