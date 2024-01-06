// import { take, fork, put, call, takeEvery } from 'redux-saga/effects'
import { put, call } from 'redux-saga/effects'

/*
function* watchSaga1() {
    while (true) {
        yield take('add1')
        yield fork(getList1)
    }
}
*/
function* getList1() {
    const result = yield call(getlistAction1)
    yield put({
        type: 'change-list1',
        data: result
    })
}
function getlistAction1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(['1', '2', '3', '4']), 1000)
    })
}
// export default watchSaga1
export { getList1 }