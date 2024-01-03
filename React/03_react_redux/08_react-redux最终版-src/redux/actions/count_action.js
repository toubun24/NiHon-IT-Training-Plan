import { INCREMENT, DECREMENT } from "../constant"

// export const createIncrementAction = data => ({ type: INCREMENT, data })
export const increment = data => ({ type: INCREMENT, data })
// export const createDecrementAction = data => ({ type: DECREMENT, data })
export const decrement = data => ({ type: DECREMENT, data })
// export const createIncrementAsyncAction = (data, time) => {
export const incrementAsync = (data, time) => {
    return (dispatch) => {
        setTimeout(() => {
            // dispatch(createIncrementAction(data))
            dispatch(increment(data))
        }, time)
    }
}
// export const createIncrementOddAction = (data, count, i) => {
export const incrementIfOdd = (data, count, i) => {
    if (count % i !== 0) {
        return (dispatch) => {
            // dispatch(createIncrementAction(data))
            dispatch(increment(data))
        }
    } else {
        return (dispatch) => {}
    }
}