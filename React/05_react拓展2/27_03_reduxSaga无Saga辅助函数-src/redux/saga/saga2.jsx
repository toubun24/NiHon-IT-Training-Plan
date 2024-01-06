import { take, fork, put, call, takeEvery } from 'redux-saga/effects'
function* watchSaga2() {
    while (true) {
        // 监听add2
        yield take('add2')
        yield fork(getList2)
    }
    // yield takeEvery('add2',getList2) // 第二种方法
}
function* getList2() {
    const result = yield call(getlistAction2_1)
    const result2 = yield call(getlistAction2_2, result)
    // 发出新的action
    yield put({
        type: 'change-list2',
        data: result2
    })
}
function getlistAction2_1() {
    // 异步处理
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(['5', '6', '7', '8']), 1000)
    })
}
function getlistAction2_2(result) {
    // 异步处理
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve([...result, '9', '10']), 1000)
    })
}
export default watchSaga2