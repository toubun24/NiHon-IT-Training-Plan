import { INCREMENT, DECREMENT } from "../constant" // ..

export const createIncrementAction = data => ({ type: INCREMENT, data })
export const createDecrementAction = data => ({ type: DECREMENT, data })
export const createIncrementAsyncAction = (data, time) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(createIncrementAction(data))
        }, time)
    }
}
export const createIncrementOddAction = (data, count, i) => {
    if (count % i !== 0) {
        return (dispatch) => {
            dispatch(createIncrementAction(data))
        }
    } else {
        return (dispatch) => {}
    }
}