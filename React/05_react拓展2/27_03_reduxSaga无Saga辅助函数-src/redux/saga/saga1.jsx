import { take, fork, put, call, takeEvery } from 'redux-saga/effects'
function* watchSaga1() {
    while (true) {
        // 监听add1
        yield take('add1')
        yield fork(getList1)
    }
    // yield takeEvery('add1',getList1) // 第二种方法
}
function* getList1() {
    const result = yield call(getlistAction1)
    // 发出新的action
    yield put({
        type: 'change-list1',
        data: result
    })
}
function getlistAction1() {
    // 异步处理
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(['1', '2', '3', '4']), 1000)
    })
}
export default watchSaga1