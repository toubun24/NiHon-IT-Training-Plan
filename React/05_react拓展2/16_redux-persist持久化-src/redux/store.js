// npm install redux-persist

import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import allReducers from "./reducers";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from '@redux-devtools/extension';
import { persistStore, persistReducer } from 'redux-persist' // redux-persist
import storage from 'redux-persist/lib/storage' // redux-persist

const persistConfig = { // redux-persist
    key: 'root',
    storage,
    // WHITELIST
    // whitelist: ['xxx']
    // BLACKLIST
    // blacklist: ['xxx']
}
const persistedReducers = persistReducer(persistConfig, allReducers) // allReducers
// export default configureStore({ reducer: allReducers }, composeWithDevTools(applyMiddleware(thunk)))
const store = configureStore({ reducer: persistedReducers }, composeWithDevTools(applyMiddleware(thunk))) // persistedReducers
const persistor = persistStore(store)
export { store, persistor }