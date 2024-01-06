// npm i --save @reduxjs/toolkit

import { configureStore } from "@reduxjs/toolkit";

interface IAction {
    type: string
    data?: any
}
interface IState {
    isShow: boolean
}
const initState = {
    isShow: true
}
const reducers = (preState: IState = initState, action: IAction) => {
    const { type } = action;
    const newState = { ...preState }
    switch (type) {
        case "show":
            newState.isShow = true
            return newState
        case "hide":
            newState.isShow = false
            return newState
        default:
            return preState
    }
}

const store = configureStore({
    reducer: reducers
})

export default store