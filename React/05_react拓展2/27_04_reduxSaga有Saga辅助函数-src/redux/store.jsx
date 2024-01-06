// import { createStore, applyMiddleware } from "redux"
// import { applyMiddleware } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import Reducer from './reducer'
import Saga from './saga' // watchSaga
import createSagaMiddleware from 'redux-saga'
const SagaMiddleware = createSagaMiddleware() // 创建中间件
// const store = createStore(reducer, applyMiddleware(SagaMiddleware)) // 'createStore' is deprecated
// const store = configureStore({ reducer: Reducer }, applyMiddleware(SagaMiddleware)) // Uncaught Error: Before running a Saga, you must mount the Saga middleware on the Store using applyMiddleware
// const store = configureStore({ reducer: Reducer, middleware: [SagaMiddleware] }) // Uncaught Error: 'middleware' field must be a callback
const store = configureStore({ reducer: Reducer, middleware: () => { return [SagaMiddleware] } }) // https://github.com/reduxjs/redux-toolkit/discussions/3945
// 运行的时机是在store创建好了之后
SagaMiddleware.run(Saga) // watchSaga
export default store