import { configureStore, applyMiddleware } from "@reduxjs/toolkit"; // applyMiddleware
import countReducer from './count_reducer'
import { thunk } from "redux-thunk"; // thunk // {}: export 'default' (imported as 'thunk') was not found in 'redux-thunk' (possible exports: thunk, withExtraArgument)

const store = configureStore({
    reducer: countReducer
}, applyMiddleware(thunk)) // thunk
  
export default store