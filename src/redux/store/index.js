import { configureStore, combineReducers } from '@reduxjs/toolkit'

import utenteReducer from '../reducers/utenteReducer'
import centroEsteticoReducer from '../reducers/centroEsteticoReducer'
import accessTokenReducer from '../reducers/accessTokenReducer'
import cardReducer from '../reducers/cardReducer'
import prenotazioniReducer from '../reducers/prenotazioniReducer'


const bigReducer = combineReducers({
  accessToken: accessTokenReducer,
  utente: utenteReducer,
  centroEstetico: centroEsteticoReducer,
 card: cardReducer,
 prenotazioni: prenotazioniReducer
})

const store = configureStore({
  reducer: bigReducer,
})

export default store