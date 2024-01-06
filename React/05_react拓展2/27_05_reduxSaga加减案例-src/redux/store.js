import { configureStore } from "@reduxjs/toolkit"
// import { applyMiddleware } from "redux"
// import allReducers from "./reducers"
import reducers from "./reducers"
// import { thunk } from "redux-thunk"
// import { composeWithDevTools } from '@redux-devtools/extension'
import createSagaMiddleware from 'redux-saga'
import All from './saga'

// export default configureStore({ reducer: allReducers }, composeWithDevTools(applyMiddleware(thunk)))
const SagaMiddleware = createSagaMiddleware() // saga在store前阻挡，监听到INCREMENTASYNC
const store = configureStore({ reducer: reducers, middleware: () => { return [SagaMiddleware] } })
SagaMiddleware.run(All)
export default store
