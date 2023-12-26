const initcount = 0
export default function countReducer(prevstate = initcount, action) {
    const { type, data } = action
    switch (type) {
        case 'increment':
            return prevstate + data
        case 'decrement':
            return prevstate - data
        default:
            return prevstate
    }
}