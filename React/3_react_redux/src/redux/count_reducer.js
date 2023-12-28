import { INCREMENT, DECREMENT } from "./constant" // import

const initcount = 0
export default function countReducer(prevstate = initcount, action) {
    const { type, data } = action
    switch (type) {
        // case 'increment':
        case INCREMENT:
            return prevstate + data
        // case 'decrement':
        case DECREMENT:
            return prevstate - data
        default:
            return prevstate
    }
}