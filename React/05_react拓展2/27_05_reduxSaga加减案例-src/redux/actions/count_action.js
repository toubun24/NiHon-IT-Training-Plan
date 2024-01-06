// import { INCREMENT, DECREMENT } from "../constant"
import { INCREMENT, DECREMENT, INCREMENTASYNC } from "../constant" // , INCREMENTASYNC

export const increment = data => ({ type: INCREMENT, data })
export const decrement = data => ({ type: DECREMENT, data })
/*
export const incrementAsync = (data, time) => {
    return (dispatch) => { // thunk方式，照做即可
        setTimeout(() => {
            dispatch(increment(data))
        }, time)
    }
}
*/
export const incrementAsync = (data, time) => ({ type: INCREMENTASYNC, data: { data, time } }) // saga
export const incrementIfOdd = (data, count, i) => {
    if (count % i !== 0) {
        return (dispatch) => {
            dispatch(increment(data))
        }
    } else {
        return (dispatch) => { }
    }
}