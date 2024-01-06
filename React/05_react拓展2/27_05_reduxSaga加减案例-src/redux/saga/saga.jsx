// ./redux/saga/saga.jsx

import { put, delay } from 'redux-saga/effects'
import { INCREMENT } from '../constant'
function* Saga(value) {
    yield delay(value.data.time) // delay
    yield put({ // put
        type: INCREMENT,
        data: value.data.data
    })
}
export { Saga }