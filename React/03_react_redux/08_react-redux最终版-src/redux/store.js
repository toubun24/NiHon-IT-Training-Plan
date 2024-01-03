import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux"; // , combineReducers
// import countReducer from './reducers/count_reducer'
// import personReducer from "./reducers/person_reducer";
import allReducers from "./reducers";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from '@redux-devtools/extension';

/*
const AllReducer = combineReducers({
    count: countReducer,
    persons: personReducer
})
*/

export default configureStore({
    // reducer: AllReducer
    reducer: allReducers
}, composeWithDevTools(applyMiddleware(thunk)))