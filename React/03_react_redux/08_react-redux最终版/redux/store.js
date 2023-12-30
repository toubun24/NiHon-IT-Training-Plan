import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware,combineReducers } from "redux";
import countReducer from './reducers/count_reducer'
import personReducer from "./reducers/person_reducer";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from '@redux-devtools/extension';

const AllReducer = combineReducers({
    count:countReducer,
    persons:personReducer
})

export default configureStore({
    reducer: AllReducer
}, composeWithDevTools(applyMiddleware(thunk)))