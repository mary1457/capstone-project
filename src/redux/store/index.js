import { configureStore, combineReducers } from '@reduxjs/toolkit';

import utenteReducer from '../reducers/utenteReducer';
import centroEsteticoReducer from '../reducers/centroEsteticoReducer';
import accessTokenReducer from '../reducers/accessTokenReducer';
import prenotazioniReducer from '../reducers/prenotazioniReducer';
import clienteReducer from '../reducers/clienteReducer';
import preferitiReducer from '../reducers/preferitiReducer';
import homeReducer from '../reducers/homeReducer'; 
import profiloReducer from '../reducers/profiloReducer'; 
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
