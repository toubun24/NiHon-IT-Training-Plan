import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import countReducer from './count_reducer'
import { thunk } from "redux-thunk";

const store = configureStore({
    reducer: countReducer
}, applyMiddleware(thunk))

export default store