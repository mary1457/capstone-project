import { configureStore, combineReducers } from '@reduxjs/toolkit'

import UtenteReducer from '../reducers/UtenteReducer'
import centroEsteticoReducer from '../reducers/CentroEsteticoReducer'
import accessTokenReducer from '../reducers/AccessTokenReducer'


const bigReducer = combineReducers({
  utente: UtenteReducer,
 centroEstetico: centroEsteticoReducer,
 accessToken: accessTokenReducer
})

const store = configureStore({
  reducer: bigReducer,
})

export default store