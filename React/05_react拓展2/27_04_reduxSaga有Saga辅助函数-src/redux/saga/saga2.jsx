// import { take, fork, put, call, takeEvery } from 'redux-saga/effects'
import { put, call } from 'redux-saga/effects'

/*
function* watchSaga2() {
    while (true) {
        yield take('add2')
        yield fork(getList2)
    }
}
*/
function* getList2() {
    const result = yield call(getlistAction2_1)
    const result2 = yield call(getlistAction2_2, result)
    yield put({
        type: 'change-list2',
        data: result2
    })
}
function getlistAction2_1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(['5', '6', '7', '8']), 1000)
    })
}
function getlistAction2_2(result) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve([...result, '9', '10']), 1000)
    })
}
// export default watchSaga2
export {getList2}