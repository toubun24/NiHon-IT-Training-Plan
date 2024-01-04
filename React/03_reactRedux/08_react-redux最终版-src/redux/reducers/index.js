// redux/reducers/index.js

import { combineReducers } from "redux";
import count from './count_reducer'
import persons from './person_reducer' // s

export default combineReducers({ count, persons })