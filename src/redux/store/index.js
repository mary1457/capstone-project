import { configureStore, combineReducers } from '@reduxjs/toolkit';


import centroEsteticoReducer from '../reducers/centroEsteticoReducer.js';
import accessTokenReducer from '../reducers/accessTokenReducer.js';
import prenotazioniReducer from '../reducers/prenotazioniReducer.js';
import clienteReducer from '../reducers/clienteReducer.js';
import preferitiReducer from '../reducers/preferitiReducer.js';
import homeReducer from '../reducers/homeReducer.js'; 
import profiloReducer from '../reducers/profiloReducer.js'; 
import utenteReducer from '../reducers/utenteReducer.js';

const bigReducer = combineReducers({
  accessToken: accessTokenReducer,
  utente: utenteReducer,
  cliente: clienteReducer,
  centroEstetico: centroEsteticoReducer,
  home: homeReducer,
  preferiti: preferitiReducer,
  prenotazioni: prenotazioniReducer,
  profilo: profiloReducer,
});

const store = configureStore({
  reducer: bigReducer,
});

export default store;