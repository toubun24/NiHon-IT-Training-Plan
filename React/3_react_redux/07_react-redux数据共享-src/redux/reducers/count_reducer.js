import { INCREMENT, DECREMENT } from "../constant" // ..

const initcount = 0
export default function countReducer(prevstate = initcount, action) {
    const { type, data } = action
    switch (type) {
        case INCREMENT:
            return prevstate + data
        case DECREMENT:
            return prevstate - data
        default:
            return prevstate
    }
}