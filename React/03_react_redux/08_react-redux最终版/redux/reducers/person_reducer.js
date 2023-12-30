import { ADD_PERSON } from "../constant"

const initstate = [{ id: '001', name: 'tom', age: 18 }]
export default function personReducer(prevstate = initstate, action) {
    const { type, data } = action
    switch (type) {
        case ADD_PERSON:
            return [data,...prevstate]
        default:
            return prevstate
    }
}