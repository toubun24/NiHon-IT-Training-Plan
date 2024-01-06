// import { all } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga/effects'
// import watchSaga1 from "./saga/saga1"
import { getList1 } from "./saga/saga1"
// import watchSaga2 from "./saga/saga2"
import { getList2 } from "./saga/saga2"

/*
function* watchSaga() {
    yield all([watchSaga1(), watchSaga2()])
}
*/
function* watchSaga() {
    yield takeEvery('add1', getList1)
    yield takeEvery('add2', getList2)
}

export default watchSaga