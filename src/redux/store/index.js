import { configureStore, combineReducers } from '@reduxjs/toolkit'

import UtenteReducer from '../reducers/UtenteReducer'
import centroEsteticoReducer from '../reducers/CentroEsteticoReducer'
import accessTokenReducer from '../reducers/AccessTokenReducer'
import cardReducer from '../reducers/CardReducer'


const bigReducer = combineReducers({
  utente: UtenteReducer,
 centroEstetico: centroEsteticoReducer,
 accessToken: accessTokenReducer,
  card:cardReducer
})

const store = configureStore({
  reducer: bigReducer,
})

export default store