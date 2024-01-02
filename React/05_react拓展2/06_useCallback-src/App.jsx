import React, { useState } from 'react' // , { useState }

export default function App() {
    const [count, setcount] = useState(0) // useState具有缓存作用，会记忆上次数据
    const add = () => {
        setcount(count + 1)
        mycount++
    }
    let mycount = 0 // 页面重新渲染就会重新声明，无法实现加一效果
    return (
        <div>
            <button onClick={add}>add
            </button>
            {count}---{mycount}
        </div>
    )
}
