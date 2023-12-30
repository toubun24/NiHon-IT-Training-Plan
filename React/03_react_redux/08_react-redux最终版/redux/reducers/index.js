// redux/reducers/index.js

import { combineReducers } from "redux";
import Count from './count_reducer'
import Person from './person_reducer'

export default combineReducers({ Count, Person })