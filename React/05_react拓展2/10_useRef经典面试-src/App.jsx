import React, { useState, useRef } from 'react' // , useRef

export default function App() {
    const [count, setcount] = useState(0)
    const myRef = useRef(0) // useRef
    const add = () => {
        setcount(count + 1)
        // mycount++
        myRef.current++
    }
    // let mycount = 0
    return (
        <div>
            <button onClick={add}>add
            </button>
            {/* {count}---{mycount} */}
            {count}---{myRef.current} {/* myRef */}
        </div>
    )
}
