import React, { useState, useCallback, useRef } from 'react' // useRef

export default function App() {
    // const [text, settext] = useState("")
    const myRef = useRef() // useRef
    let [list, setlist] = useState(['a', 'b', 'c', 'd'])
    /*
    const add = useCallback((event) => {
        settext(event.target.value)
    }, []
    )
    */
    const push = useCallback(() => {
        // setlist([...list, text])
        setlist([...list, myRef.current.value]) // myRef
        // settext("")
        myRef.current.value = '' // myRef
        // }, [list, text])
    // }, [list, myRef.current]) // myRef
    }, [list]) // React Hook useCallback has an unnecessary dependency: 'myRef.current'. Either exclude it or remove the dependency array. Mutable values like 'myRef.current' aren't valid dependencies because mutating them doesn't re-render the component react-hooks/exhaustive-deps
    const del = useCallback((index) => {
        const newlist = [...list]
        newlist.splice(index, 1)
        setlist(newlist)
    }, [list]
    )
    return (
        <div>
            {/* <input type="text" value={text} onChange={add} /> */}
            <input type="text" ref={myRef}/> {/* ref={myRef} */}
            <button onClick={push}>add</button>
            <ul>
                {list.map((item, index) => {
                    return <li key={index}>{item}<button onClick={() => { del(index) }}>delete</button></li>
                })}
            </ul>
        </div>
    )
}
