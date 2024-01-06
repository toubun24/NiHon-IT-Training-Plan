// ./redux/saga.jsx

import { takeEvery } from 'redux-saga/effects'
import { Saga } from './saga/saga'
import { INCREMENTASYNC } from "./constant"
function* All() {
    yield takeEvery(INCREMENTASYNC, Saga) // 匹配INCREMENTASYNC
}
export default All