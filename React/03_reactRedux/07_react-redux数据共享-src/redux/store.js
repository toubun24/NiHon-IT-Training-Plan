// yarn add @redux-devtools/extension

import { configureStore } from "@reduxjs/toolkit"; // combineReducers
import { applyMiddleware,combineReducers } from "redux";
// import countReducer from './count_reducer'
import countReducer from './reducers/count_reducer'
import personReducer from "./reducers/person_reducer";
import { thunk } from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import { composeWithDevTools } from '@redux-devtools/extension'; // import { composeWithDevTools } from "redux-devtools-extension"; // yarn add @redux-devtools/extension

const AllReducer = combineReducers({ // combineReducers
    count:countReducer,
    persons:personReducer
})

export default configureStore({
    reducer: AllReducer
}, composeWithDevTools(applyMiddleware(thunk)))