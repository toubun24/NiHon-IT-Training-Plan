import React, { useReducer } from 'react'

const initialState = {
    count: 0
}
const reducer = (prevstate, actions) => { // reducer
    const newstate = { ...prevstate }
    switch (actions.type) {
        case "add":
            newstate.count++
            return newstate
        case "minus":
            newstate.count--
            return newstate
        default:
            return prevstate
    }
}

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState) // useReducer // reducer
    return (
        <div>
            <button onClick={() => dispatch({ type: "add" })}>+1</button>
            {state.count}
            <button onClick={() => dispatch({ type: "minus" })}>-1</button>
        </div>
    )
}
