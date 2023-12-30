import React, { useState, createContext } from 'react'

const MyContext = createContext() // createContext
const { Consumer, Provider } = MyContext // Consumer, Provider

export default function A() {
    const [state] = useState({ username: 'tom', age: '18' })
    const { username, age } = state
    return (
        <div style={{ backgroundColor: "pink", padding: "8px" }}> {/* style={{:"",}} */}
            <h2>Component A</h2>
            <span>{username},年龄是：{age}</span> {/* {} */}
            <Provider value={{ username, age }}> {/* {{}} */}
                <B />
            </Provider>
        </div>
    )
}

function B() { // export default
    return (
        <div style={{ backgroundColor: "skyblue", padding: "8px" }}>
            <h2>Component B</h2>
            <C /> {/* no Provider or Consumer */}
        </div>
    )
}

function C() { // export default
    return (
        <div style={{ backgroundColor: "orange", padding: "8px" }}>
            <h2>Component C</h2>
            <Consumer>
                {value => `${value.username},年龄是：${value.age}`}
            </Consumer>
        </div>
    )
}