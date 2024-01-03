import { combineReducers } from "redux";
import count from './count_reducer'
import persons from './person_reducer'

export default combineReducers({ count, persons })