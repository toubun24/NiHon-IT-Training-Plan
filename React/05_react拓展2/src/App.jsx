import React, { useState, useCallback } from 'react' // , { , useCallback }

export default function App() {
    // const [count, setcount] = useState(0)
    const [text, settext] = useState("")
    let [list, setlist] = useState(['a', 'b', 'c', 'd'])
    /*
    const add = () => {
        setcount(count + 1)
        mycount++
    }
    */
    const add = useCallback((event) => { // 不使用useCallback功能正常，使用useCallback避免无用的重新声明，减少性能消耗
        settext(event.target.value)
    }, [] // 如果传入空数组， 那么就是第一次创建后就被缓存
    )
    // let mycount = 0
    const push = useCallback(() => {
        setlist([...list, text])
        settext("")
    }, [list, text] // 第二个参数和useEffect的第二个参数很像，作为监控使用，被监控对象发生改变引起方法重新声明
    )
    const del = useCallback((index) => {
        const newlist = [...list]
        newlist.splice(index, 1)
        setlist(newlist)
    }, [list]
    )
    return (
        <div>
            <input type="text" value={text} onChange={add} />
            <button onClick={push}>add</button>
            <ul>
                {list.map((item, index) => {
                    return <li key={index}>{item}<button onClick={() => { del(index) }}>delete</button></li>
                })}
            </ul>
        </div>
    )
}
