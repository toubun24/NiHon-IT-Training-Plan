// npm install @reduxjs/toolkit

// import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import countReducer from './count_reducer'

// export default createStore(countReducer)
const store = configureStore({
    reducer: countReducer
})
  
export default store