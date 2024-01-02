// 想在两个函数之间共享逻辑时，我们会把它提取到第三个函数中
// 必须以use开头

import React, { useState, useEffect, useMemo } from 'react'
import axios from "axios"

// export default function Yingyuan() {
    // const [text, settext] = useState("")

    /* useList()
    const [list, setlist] = useState([])
    useEffect(() => {
        axios({
            url: 'https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=5267084',
            method: 'GET',
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"16454231757924214661121","bc":"442000"}',
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        }).then((response) => {
            setlist(response.data.data.cinemas)
        }, (reason) => {
            console.log(reason.message)
        })
    }, [])
    */
function useList() { // 自定义useList
    const [list, setlist] = useState([])
    useEffect(() => {
        axios({
            url: 'https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=5267084',
            method: 'GET',
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"16454231757924214661121","bc":"442000"}',
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        }).then((response) => {
            setlist(response.data.data.cinemas)
        }, (reason) => {
            console.log(reason.message)
        })
    }, [])
    return { list } // return {}
}

    /* useFilter(list,text)
    const getlist = useMemo(() =>
        list.filter(item => {
            return item.name.toUpperCase().includes(text.toUpperCase())
                || item.address.toUpperCase().includes(text.toUpperCase())
        }), [list, text]
    )
    */
function useFilter(list, text) { // 自定义useFilter
    const getlist = useMemo(() =>
        list.filter(item => {
            return item.name.toUpperCase().includes(text.toUpperCase())
                || item.address.toUpperCase().includes(text.toUpperCase())
        }), [list, text]
    )
    return { getlist } // return {}
}

export default function Yingyuan() { // Yingyuan
    const [text,settext] = useState("") // useState
    const {list} = useList() // useList
    const {getlist} = useFilter(list,text) // useFilter
    return (
        <div>
            <input type="text" onChange={(event) => { return settext(event.target.value) }} />
            {
                getlist.map(item => {
                    return <dl key={item.cinemaId}>
                        <dt>{item.name}</dt>
                        <dd>{item.address}</dd>
                    </dl>
                })
            }
        </div>
    )
}
