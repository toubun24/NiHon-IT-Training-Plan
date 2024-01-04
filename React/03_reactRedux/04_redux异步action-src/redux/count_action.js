import { INCREMENT, DECREMENT } from "./constant"

export const createIncrementAction = data => ({ type: INCREMENT, data })
export const createDecrementAction = data => ({ type: DECREMENT, data })
export const createIncrementAsyncAction = (data, time) => { // createIncrementAsyncAction
    return (dispatch) => {
        setTimeout(() => {
            dispatch(createIncrementAction(data)) // createIncrementAction
        }, time)
    }
}
export const createIncrementOddAction = (data, count, i) => {
    if (count % i !== 0) { // count
        return (dispatch) => {
            dispatch(createIncrementAction(data)) // data
        }
    } else {
        return (dispatch) => {} // => {}
    }
}