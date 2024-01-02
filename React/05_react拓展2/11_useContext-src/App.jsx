// public/test.json

import React, { useState, useEffect, useContext } from 'react'
import axios from "axios"
import './App.css'

const context = React.createContext() // 创建context对象

export default function App() {
    const [list, setlist] = useState([])
    const [info, setinfo] = useState("") // setinfo
    useEffect(() => { // useEffect
        axios.get("/test.json").then((response) => {
            setlist(response.data.data.films)
        })
    }, [])

    return (
        <context.Provider value={{ info: info, changeInfo: (value) => { setinfo(value) } }}> {/* 生产者发送状态及方法，给子组件的子组件传递数据 */} {/* changeInfo & setinfo */}
            <div>
                {
                    list.map(item =>
                        <FilmItem key={item.filmId} {...item} ></FilmItem> // 子组件：FilmItem
                    )
                }
                <Detail /> {/* 子组件：Detail */}
            </div>
        </context.Provider>
    )
}

function FilmItem(props) {  // props
    const { name, poster, grade, synopsis } = props; // props // synopsis
    const value = useContext(context) // 消费者声明需要数据：context
    return <div className="filmitem" onClick={() => {
        value.changeInfo(synopsis) // changeInfo // synopsis
    }}>
        <img src={poster} alt={name} />
        <h4>{name}</h4>
        <div>观众评分：{grade}</div>
    </div>

}

function Detail() {
    const value = useContext(context) // 消费者声明需要数据：context
    return <div className="filmdetail">
        {value.info} {/* info */}
    </div>
}