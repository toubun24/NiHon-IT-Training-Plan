import React, { useReducer, useContext } from 'react' // useContext

const Context = React.createContext() // 创建context对象
const initialState = {
    // count: 0
    a: "aaaa",
    b: "bbbb"
}
const reducer = (prevstate, actions) => {
    const newstate = { ...prevstate }
    switch (actions.type) {
        /*
        case "add":
            newstate.count++
            return newstate
        case "minus":
            newstate.count--
            return newstate
        */
        case "change-a":
            newstate.a = actions.value
            return newstate
        case "change-b":
            newstate.b = actions.value
            return newstate
        default:
            return prevstate
    }
}

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState)
    /*
    return (
        <div>
            <button onClick={() => dispatch({ type: "add" })}>+1</button>
            {state.count}
            <button onClick={() => dispatch({ type: "minus" })}>-1</button>
        </div>
    )
    */
    return (
        <Context.Provider value={{ state, dispatch }}>
            <Component1 />
            <Component2 />
            <Component3 />
        </Context.Provider>
    )
}

function Component1() { // Component1
    const { dispatch } = useContext(Context) // dispatch // Context
    return <div>
        <button onClick={() => dispatch({type: 'change-a',value: "cccc"})}>改变a</button> {/* dispatch */}
        <button onClick={() => dispatch({type: 'change-b',value: "dddd"})}>改变b</button> {/* dispatch */}
    </div>
}

function Component2() { // Component2
    const { state } = useContext(Context) // Context // state
    return <div>
        {state.a}
    </div>
}

function Component3() { // Component3
    const { state } = useContext(Context) // Context // state
    return <div>
        {state.b}
    </div>
}